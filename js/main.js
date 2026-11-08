/* ========================================================
   Fizz Clubhouse - Main Application Entrypoint
   アプリ初期化・背景気泡生成・連携
   ======================================================== */

import { ElevatorController } from './elevator.js';
import { ModalManager } from './modal.js';
import { StatsCounter } from './counter.js';
import { supabaseClient } from './supabase.js';


document.addEventListener('DOMContentLoaded', async () => {

  const memberId =
    localStorage.getItem('fizz_member_id');

  if (!memberId) {

    ['2f', '3f', '4f', 'b1f']
      .forEach(id => {

        const floor =
          document.getElementById(id);

        if (floor) {
          floor.style.display = 'none';
        }

      });

  }
  const { data: newsData, error: newsError }
    = await supabaseClient
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

  console.log('News:', newsData);
  console.log('News Error:', newsError);

  const today = new Date();

  const todayDay =
    today.getDate();

  const todayMonth =
    today.getMonth() + 1;

  console.log(
    'Today:',
    todayDay
  );

  const calendarDay =
    document.getElementById('calendarDay');

  if (calendarDay) {
    calendarDay.textContent =
      todayDay;
  }

  const calendarStatus =
    document.getElementById('calendarStatus');

  if (calendarStatus) {
    calendarStatus.textContent =
      'TODAY';
  }

  const { data: membersData } =
    await supabaseClient
      .from('members')
      .select('name,birthday');

  if (membersData && calendarStatus) {

    const birthdayMember =
      membersData.find(member => {

        if (!member.birthday) {
          return false;
        }

        const birthday =
          new Date(member.birthday);

        return (
          birthday.getMonth() + 1 === todayMonth &&
          birthday.getDate() === todayDay
        );

      });

    if (birthdayMember) {

      calendarStatus.textContent =
        'BIRTHDAY';

      console.log(
        '🎂 Birthday:',
        birthdayMember.name
      );

    }

  }


  const announcementsArea =
    document.getElementById('announcements');

  if (announcementsArea && newsData) {

    announcementsArea.innerHTML = '';

    newsData.forEach(item => {

      announcementsArea.innerHTML += `
      <div class="announcement-card">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      </div>
    `;

    });

  }

  // 1. Initialize Elevator System
  const elevator = new ElevatorController('.clubhouse-viewport');

  // 2. Initialize Modal Dialog System
  const modalManager = new ModalManager(elevator.sound);

  // 3. Initialize Stats Counter
  new StatsCounter('#entranceCounters');

  // 4. Generate Animated Soda Bubbles in Background
  createFloatingBubbles();

  console.log('🫧 Fizz Clubhouse Portal initialized successfully!');
});

function createFloatingBubbles() {
  const container = document.querySelector('.bg-bubbles-container');
  if (!container) return;

  const bubbleCount = 18;
  const colors = [
    'rgba(6, 214, 160, 0.25)', // mint
    'rgba(17, 138, 178, 0.25)', // soda
    'rgba(255, 209, 102, 0.3)', // yellow
    'rgba(239, 71, 111, 0.2)'   // pink
  ];

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bg-bubble';

    const size = Math.random() * 32 + 12; // 12px ~ 44px
    const left = Math.random() * 100; // 0% ~ 100%
    const duration = Math.random() * 10 + 12; // 12s ~ 22s
    const delay = Math.random() * 10; // 0s ~ 10s
    const color = colors[Math.floor(Math.random() * colors.length)];

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.background = `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), ${color})`;

    container.appendChild(bubble);
  }
}
