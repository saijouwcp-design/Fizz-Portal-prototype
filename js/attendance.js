/* ========================================================
   Fizz Clubhouse - Attendance & Schedule Management
   2F メンバー向けイベント出欠管理・カレンダーエンジン
   ======================================================== */

import { supabaseClient } from './supabase.js';
async function testEvents() {

  const { data, error } = await supabaseClient
    .from('events')
    .select('*')
    .order('event_date');

  console.log('Events:', data);
  console.log('Events Error:', error);

}

export class AttendanceSystem {
  constructor(soundSystem) {
    this.sound = soundSystem;
    this.storageKey = 'fizz_attendance_events_v3';
    this.events = this.loadEvents();
    this.selectedEventId = this.events[0]?.id || null;
    this.membersMap = {}; // squadNum or memberId -> name
    this.initMembersMap();
    this.loadEventsFromSupabase();
  }

  async initMembersMap() {
    try {
      const { data } = await supabaseClient.from('members').select('*');
      if (data) {
        data.forEach(m => {
          const idKey = String(m.members_id || m.member_id || m.id).trim();
          this.membersMap[idKey] = m.name;
          if (idKey.length === 1) {
            this.membersMap[`00${idKey}`] = m.name;
            this.membersMap[`0${idKey}`] = m.name;
          } else if (idKey.length === 2) {
            this.membersMap[`0${idKey}`] = m.name;
          }
        });
      }
    } catch (e) {
      console.warn('Failed to load membersMap:', e);
    }
  }

  getMemberName(squadNum) {
    const raw = String(squadNum || '').trim();
    if (this.membersMap[raw]) return this.membersMap[raw];
    const num = parseInt(raw, 10);
    if (!isNaN(num) && this.membersMap[String(num)]) return this.membersMap[String(num)];
    return `背番号${raw}`;
  }

  async loadEventsFromSupabase() {

    const { data, error } = await supabaseClient
      .from('events')
      .select('*')
      .order('event_date');

    if (error) {
      console.error('Events Load Error:', error);
      return;
    }

    this.events = data.map(evt => ({
      id: evt.id,
      title: evt.title,
      date: evt.event_date,
      dateLabel: evt.event_date,
      startTime: evt.start_time,
      endTime: evt.end_time,
      location: evt.location,
      category: evt.category,
      targetKids: evt.target_kids,
      requiredStaff: evt.required_staff,
      description: evt.description,
      attendees: []
    }));

    if (this.events.length > 0) {
      this.selectedEventId = this.events[0].id;
    }

    console.log('Loaded Events:', this.events);

  }

  loadEvents() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load attendance from localStorage', e);
    }
    return [];
  }

  saveEvents() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.events));
    } catch (e) {
      console.warn('Failed to save attendance', e);
    }
  }

  getEvent(id) {
    return this.events.find(e => e.id === id);
  }

  // Register or update attendance
  registerAttendance(eventId, attendeeData) {
    const event = this.getEvent(eventId);
    if (!event) return false;

    // Check if attendee already exists by squadNum
    const existingIndex = event.attendees.findIndex(a => String(a.squadNum).trim() === String(attendeeData.squadNum).trim());
    if (existingIndex >= 0) {
      event.attendees[existingIndex] = attendeeData;
    } else {
      event.attendees.push(attendeeData);
    }

    supabaseClient
      .from('attendance')
      .insert([
        {
          event_id: eventId,
          squad_num: attendeeData.squadNum,
          member_name: attendeeData.name,
          status: attendeeData.status,
          attendance_time: attendeeData.time,
          comment: attendeeData.comment
        }
      ])
      .then(({ error }) => {
        if (error) {
          console.error('Attendance Save Error:', error);
        } else {
          console.log('Attendance Saved!');
        }
      });

    this.saveEvents();
    if (this.sound) this.sound.playFanfare();
    return true;
  }

  // Render the full Attendance & Calendar Modal Interface
  renderModalUI(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="attendance-manager-container">
        <!-- Header Nav Tabs: Event Selector Cards -->
        <div class="attendance-event-selector">
          <div class="attendance-selector-title">
            <span>📅 活動スケジュール一覧（出欠回答したいイベントを選択）</span>
          </div>
          <div class="attendance-cards-scroll">
            ${this.events.map(evt => {
      const count = evt.attendees.filter(a => a.status === 'attending').length;
      const isFull = count >= evt.requiredStaff;
      const isSelected = evt.id === this.selectedEventId;

      return `
                <button type="button" class="attendance-card-btn ${isSelected ? 'is-selected' : ''}" data-event-id="${evt.id}">
                  <div class="card-btn-date">${evt.dateLabel.split(' ')[0]}</div>
                  <div class="card-btn-info">
                    <div class="card-btn-title">${evt.title}</div>
                    <div class="card-btn-status">
                      <span class="status-badge ${isFull ? 'full' : 'recruiting'}">
                        ${isFull ? '✅ スタッフ充足' : `⚠️ あと${evt.requiredStaff - count}名募集`}
                      </span>
                      <span class="status-count">参加: <strong>${count}</strong> / 必要: ${evt.requiredStaff}名</span>
                    </div>
                  </div>
                </button>
              `;
    }).join('')}
          </div>
        </div>

        <!-- Selected Event Detail & Attendance Form -->
        <div class="attendance-detail-panel" id="attendanceDetailPanel">
          <!-- Dynamically filled by renderEventDetail -->
        </div>
      </div>
    `;

    this.bindSelectorEvents(container);
    this.renderEventDetail(this.selectedEventId, container);
  }

  bindSelectorEvents(container) {
    const cardBtns = container.querySelectorAll('.attendance-card-btn');
    cardBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const evtId = btn.getAttribute('data-event-id');
        this.selectedEventId = evtId;

        cardBtns.forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');

        if (this.sound) this.sound.playClick();
        this.renderEventDetail(evtId, container);
      });
    });
  }

  renderEventDetail(eventId, container) {
    const detailPanel = container.querySelector('#attendanceDetailPanel');
    const evt = this.getEvent(eventId);
    if (!detailPanel || !evt) return;

    // 区分ごとの分類
    const attendingList = evt.attendees.filter(a => a.status === 'attending');
    const lateList = evt.attendees.filter(a => a.status === 'late');
    const earlyList = evt.attendees.filter(a => a.status === 'early_leave');
    const absentList = evt.attendees.filter(a => a.status === 'absent');

    const count = attendingList.length + lateList.length + earlyList.length;
    const progressPercent = Math.min(Math.round((count / evt.requiredStaff) * 100), 100);

    const savedSquad = localStorage.getItem('fizz_user_squad') || '';

    // 既存回答の確認
    const existingEntry = evt.attendees.find(a => String(a.squadNum).trim() === savedSquad.trim());
    const currentStatus = existingEntry ? existingEntry.status : 'attending';
    const currentTime = existingEntry ? (existingEntry.time || '') : '';

    detailPanel.innerHTML = `
      <div class="event-detail-card">
        <div class="event-header-row">
          <div>
            <span class="event-cat-tag">${evt.category}</span>
            <h3 class="event-detail-title">${evt.title}</h3>
          </div>
          <div class="event-meta-badge">
            <span class="meta-date">🗓️ ${evt.dateLabel}</span>
            <span class="meta-loc">📍 ${evt.location}</span>
          </div>
        </div>

        <p class="event-detail-desc">${evt.description}</p>
        <div class="event-meta-sub">
          <span>👶 対象: <strong>${evt.targetKids}</strong></span>
          <span>👥 必要スタッフ数: <strong>${evt.requiredStaff}名</strong></span>
        </div>

        <!-- Staff Progress Bar -->
        <div class="staff-progress-box">
          <div class="progress-labels">
            <span>現在の参加確定スタッフ: <strong>${count}名</strong></span>
            <span>必要: <strong>${evt.requiredStaff}名</strong> (${progressPercent}%)</span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill ${count >= evt.requiredStaff ? 'success' : ''}" style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        <!-- Attendance Submit Form (WCP Member Portal Style) -->
        <div class="attendance-form-wrapper">
          <h4 class="form-section-title">✏️ 出欠登録（背番号・区分入力）</h4>
          <form id="attendanceSubmitForm" class="attendance-form">
            <div class="form-group">
              <label class="form-label">背番号 (Squad Number) <span class="form-required-badge">必須</span></label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="text" id="attSquadNum" class="form-input" required placeholder="例: 001 または 1" value="${savedSquad}" style="max-width: 200px;">
                <span id="squadNamePreview" style="font-size: 0.9rem; font-weight: 800; color: var(--fizz-navy);"></span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">出欠区分を選択 <span class="form-required-badge">必須</span></label>
              <div class="wcp-status-grid">
                <button type="button" class="wcp-status-btn ${currentStatus === 'attending' ? 'active' : ''}" data-status="attending" id="status-btn-attending">
                  <span class="status-icon">🟢</span>
                  <span class="status-text">参加</span>
                </button>
                <button type="button" class="wcp-status-btn ${currentStatus === 'late' ? 'active' : ''}" data-status="late" id="status-btn-late">
                  <span class="status-icon">🟠</span>
                  <span class="status-text">途中参加</span>
                </button>
                <button type="button" class="wcp-status-btn ${currentStatus === 'early_leave' ? 'active' : ''}" data-status="early_leave" id="status-btn-early_leave">
                  <span class="status-icon">🔵</span>
                  <span class="status-text">途中退出</span>
                </button>
                <button type="button" class="wcp-status-btn ${currentStatus === 'absent' ? 'active' : ''}" data-status="absent" id="status-btn-absent">
                  <span class="status-icon">🔴</span>
                  <span class="status-text">欠席</span>
                </button>
              </div>
              <input type="hidden" id="selectedStatusInput" value="${currentStatus}">
            </div>

            <!-- 時間指定 (途中参加・途中退出時) -->
            <div class="form-group" id="timeInputGroup" style="display: ${currentStatus === 'late' || currentStatus === 'early_leave' ? 'block' : 'none'};">
              <label class="form-label" id="timeInputLabel">
                ${currentStatus === 'late' ? '⏰ 何時から参加できますか？' : '⏰ 何時に抜けますか？'}
              </label>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span id="timePrefixText">${currentStatus === 'early_leave' ? '開始 〜' : ''}</span>
                <input type="time" id="attTimeInput" class="form-input" style="max-width: 140px;" value="${currentTime || (currentStatus === 'late' ? '14:00' : '15:00')}">
                <span id="timeSuffixText">${currentStatus === 'late' ? '〜 参加' : 'まで'}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">連絡・引き継ぎコメント（任意）</label>
              <input type="text" id="attComment" class="form-input" placeholder="例: 機材運搬手伝えます / 課題終わり次第向かいます 等" value="${existingEntry?.comment || ''}">
            </div>

            <button type="submit" class="attendance-submit-btn">
              ✨ 出欠を登録・更新する
            </button>
          </form>
          <div id="attendanceNotice" class="attendance-submit-notice"></div>
        </div>

        <!-- Current Attendees List -->
        <div class="attendees-roster-box">
          <h4 class="roster-section-title">
            <span>👥 参加スタッフ一覧 (${attendingList.length + lateList.length + earlyList.length}名)</span>
          </h4>
          <div class="attendees-chips-grid">
            ${attendingList.length > 0 ? attendingList.map(a => `
              <div class="attendee-chip attending">
                <div class="chip-avatar">🟢</div>
                <div class="chip-info">
                  <div class="chip-name"><span class="chip-squad">#${a.squadNum}</span> ${a.name || this.getMemberName(a.squadNum)}</div>
                  ${a.comment ? `<div class="chip-comment">💬 ${a.comment}</div>` : ''}
                </div>
              </div>
            `).join('') : '<p class="empty-roster-text">フル参加メンバーはまだ登録されていません。</p>'}
          </div>

          ${lateList.length > 0 ? `
            <h5 class="roster-sub-title">🟠 途中参加 (${lateList.length}名)</h5>
            <div class="attendees-chips-grid">
              ${lateList.map(a => `
                <div class="attendee-chip maybe">
                  <div class="chip-avatar">⏰</div>
                  <div class="chip-info">
                    <div class="chip-name"><span class="chip-squad">#${a.squadNum}</span> ${a.name || this.getMemberName(a.squadNum)} <span class="chip-time">(${a.time}〜)</span></div>
                    ${a.comment ? `<div class="chip-comment">💬 ${a.comment}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${earlyList.length > 0 ? `
            <h5 class="roster-sub-title">🔵 途中退出 (${earlyList.length}名)</h5>
            <div class="attendees-chips-grid">
              ${earlyList.map(a => `
                <div class="attendee-chip early">
                  <div class="chip-avatar">🏃</div>
                  <div class="chip-info">
                    <div class="chip-name"><span class="chip-squad">#${a.squadNum}</span> ${a.name || this.getMemberName(a.squadNum)} <span class="chip-time">(〜${a.time}まで)</span></div>
                    ${a.comment ? `<div class="chip-comment">💬 ${a.comment}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${absentList.length > 0 ? `
            <h5 class="roster-sub-title">🔴 欠席 (${absentList.length}名)</h5>
            <div class="attendees-chips-grid">
              ${absentList.map(a => `
                <div class="attendee-chip absent">
                  <div class="chip-avatar">❌</div>
                  <div class="chip-info">
                    <div class="chip-name"><span class="chip-squad">#${a.squadNum}</span> ${a.name || this.getMemberName(a.squadNum)}</div>
                    ${a.comment ? `<div class="chip-comment">💬 ${a.comment}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.bindFormEvents(eventId, container);
  }

  bindFormEvents(eventId, container) {
    const form = container.querySelector('#attendanceSubmitForm');
    const notice = container.querySelector('#attendanceNotice');
    const squadInput = container.querySelector('#attSquadNum');
    const squadPreview = container.querySelector('#squadNamePreview');
    const statusBtns = container.querySelectorAll('.wcp-status-btn');
    const statusInput = container.querySelector('#selectedStatusInput');
    const timeGroup = container.querySelector('#timeInputGroup');
    const timeLabel = container.querySelector('#timeInputLabel');
    const timePrefix = container.querySelector('#timePrefixText');
    const timeSuffix = container.querySelector('#timeSuffixText');
    const timeInput = container.querySelector('#attTimeInput');

    if (!form) return;

    // 背番号リアルタイム名前プレビュー
    const updatePreview = () => {
      const val = squadInput.value.trim();
      if (val) {
        const name = this.getMemberName(val);
        squadPreview.textContent = name ? `👤 ${name}` : '';
      } else {
        squadPreview.textContent = '';
      }
    };
    if (squadInput) {
      squadInput.addEventListener('input', updatePreview);
      updatePreview();
    }

    // 出欠区分ボタン切り替え
    statusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const status = btn.getAttribute('data-status');
        statusInput.value = status;
        statusBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (status === 'late') {
          timeGroup.style.display = 'block';
          timeLabel.textContent = '⏰ 何時から参加できますか？';
          timePrefix.textContent = '';
          timeSuffix.textContent = '〜 参加';
        } else if (status === 'early_leave') {
          timeGroup.style.display = 'block';
          timeLabel.textContent = '⏰ 何時に抜けますか？';
          timePrefix.textContent = '開始 〜 ';
          timeSuffix.textContent = 'まで (途中退出)';
        } else {
          timeGroup.style.display = 'none';
        }

        if (this.sound) this.sound.playClick();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const squadNum = squadInput.value.trim();
      const status = statusInput.value || 'attending';
      const time = (status === 'late' || status === 'early_leave') ? (timeInput ? timeInput.value : '') : '';
      const commentInput = form.querySelector('#attComment');
      const comment = commentInput ? commentInput.value.trim() : '';

      if (!squadNum) {
        alert('背番号（Squad Number）を入力してください。');
        return;
      }

      if ((status === 'late' || status === 'early_leave') && !time) {
        alert('時間を指定してください。');
        return;
      }

      const memberName = this.getMemberName(squadNum);

      // Save squad number for user
      localStorage.setItem('fizz_user_squad', squadNum);

      const success = this.registerAttendance(eventId, {
        squadNum,
        name: memberName,
        status,
        time,
        comment,
        timestamp: new Date().toISOString()
      });

      if (success) {
        notice.textContent = `🎉 背番号 #${squadNum} (${memberName}) の出欠を登録しました！`;
        notice.classList.add('is-visible');

        setTimeout(() => {
          this.renderModalUI(container);
        }, 600);
      }
    });
  }
}
