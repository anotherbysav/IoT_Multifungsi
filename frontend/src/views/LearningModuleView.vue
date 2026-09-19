<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import {
  BookOpen, Compass, Target, ListChecks, Code2, CircleHelp, CheckCircle2,
  Timer, GraduationCap, ArrowRight, PlayCircle, Cpu, ToggleRight, ScanLine, Sparkles
} from 'lucide-vue-next'
import { store } from '../store'
import { modules } from '../data/learning'

const route = useRoute()
const molist = [
  { slug: 'iot-basics', title: 'IoT Basics', icon: Cpu },
  { slug: 'automation', title: 'Automation', icon: ToggleRight },
  { slug: 'computer-vision', title: 'Computer Vision', icon: ScanLine },
  { slug: 'ai-iot', title: 'AI + IoT', icon: Sparkles }
]

const mod = computed(() => modules[route.params.slug] || modules['iot-basics'])

const answers = reactive({})
const score = computed(() => {
  let s = 0
  mod.value.quiz.forEach((q, i) => {
    if (answers[i] === q.answer) s++
  })
  return s
})
const checked = computed(() => Object.keys(answers).length === mod.value.quiz.length)

function resetQuiz() {
  for (const k in answers) delete answers[k]
}

function complete() {
  store.learningDone[mod.value.slug] = true
  store.toast(`Modul "${mod.value.title}" selesai`)
}
</script>

<template>
  <div>
    <div class="bread">
      <BookOpen :size="14" /> Learning Modules <span class="sep">/</span> {{ mod.title }}
    </div>

    <div class="layout">
      <aside class="l-nav card">
        <p class="ln-label">Daftar Modul</p>
        <RouterLink
          v-for="m in molist"
          :key="m.slug"
          :to="`/learn/${m.slug}`"
          class="ln-item"
          :class="{ active: route.params.slug === m.slug }"
        >
          <span class="ln-ic"><component :is="m.icon" :size="17" /></span>
          <span class="ln-main">
            <span>{{ m.title }}</span>
            <em v-if="store.learningDone[m.slug]">Selesai</em>
          </span>
          <ArrowRight :size="14" class="ln-chev" />
        </RouterLink>
      </aside>

      <div class="l-main">
        <div class="card hero rise rise-1">
          <div class="hero-top">
            <span class="hero-ic"><component :is="molist.find((m) => m.slug === mod.slug)?.icon || Cpu" :size="22" /></span>
            <div class="hero-txt">
              <h1>{{ mod.title }}</h1>
              <p class="hero-sub">{{ mod.subtitle }}</p>
              <p class="hero-desc">{{ mod.desc }}</p>
            </div>
            <div class="hero-badge">
              <span class="chip chip-gray"><GraduationCap :size="12" /> {{ mod.level }}</span>
              <span class="chip chip-gray"><Timer :size="12" /> {{ mod.duration }}</span>
            </div>
          </div>
          <div class="hero-prog">
            <div class="prog-row">
              <span>Progres Modul</span>
              <strong>{{ mod.progress }}%</strong>
            </div>
            <div class="prog-bar"><div class="prog-fill" :style="{ width: mod.progress + '%' }"></div></div>
          </div>
          <button v-if="!store.learningDone[mod.slug]" class="btn btn-primary" @click="complete">
            <CheckCircle2 :size="15" /> Tandai Selesai
          </button>
          <span v-else class="chip chip-green"><CheckCircle2 :size="13" /> Modul sudah selesai</span>
        </div>

        <div class="card sec rise rise-2">
          <div class="card-head"><h3 class="card-title"><Target :size="16" /> Tujuan Pembelajaran</h3></div>
          <ul class="goals">
            <li v-for="g in mod.goals" :key="g"><CheckCircle2 :size="15" />{{ g }}</li>
          </ul>
        </div>

        <div v-for="(s, i) in mod.sections" :key="i" class="card sec rise" :class="`rise-${(i + 1) % 4}`">
          <div class="card-head"><h3 class="card-title"><Compass :size="16" /> {{ s.heading }}</h3></div>
          <div class="sec-body">
            <p class="sec-text">{{ s.body }}</p>
            <ul v-if="s.points" class="points">
              <li v-for="(p, j) in s.points" :key="j">{{ p }}</li>
            </ul>
            <table v-if="s.table" class="table">
              <thead>
                <tr><th v-for="h in ['Sensor', 'Fungsi', 'Pin', 'Output']" :key="h">{{ h }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="(r, j) in s.table" :key="j">
                  <td class="mono">{{ r.sensor }}</td>
                  <td>{{ r.fungsi }}</td>
                  <td class="mono">{{ r.pin }}</td>
                  <td>{{ r.output }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card sec rise rise-2">
          <div class="card-head">
            <h3 class="card-title"><ListChecks :size="16" /> {{ mod.practice.title }}</h3>
            <span class="chip chip-green"><PlayCircle :size="12" /> Panduan</span>
          </div>
          <ol class="steps">
            <li v-for="(st, i) in mod.practice.steps" :key="i">
              <span class="step-num">{{ i + 1 }}</span>
              {{ st }}
            </li>
          </ol>
        </div>

        <div class="card sec rise rise-3">
          <div class="card-head">
            <h3 class="card-title"><Code2 :size="16" /> {{ mod.code.title }}</h3>
            <span class="chip chip-gray">{{ mod.code.lang }}</span>
          </div>
          <pre class="codeblock"><code>{{ mod.code.snippet }}</code></pre>
        </div>

        <div class="card sec rise rise-3">
          <div class="card-head">
            <h3 class="card-title"><CircleHelp :size="16" /> Latihan Soal</h3>
            <span v-if="checked" class="chip" :class="score === mod.quiz.length ? 'chip-green' : 'chip-amber'">
              Skor: {{ score }}/{{ mod.quiz.length }}
            </span>
          </div>
          <div class="quiz-body">
            <div v-for="(q, i) in mod.quiz" :key="i" class="quiz-q">
              <p class="quiz-text">{{ i + 1 }}. {{ q.q }}</p>
              <div class="quiz-opts">
                <button
                  v-for="(o, j) in q.options"
                  :key="j"
                  class="qopt"
                  :class="{
                    sel: answers[i] === j,
                    right: checked && j === q.answer,
                    wrong: checked && answers[i] === j && j !== q.answer
                  }"
                  @click="answers[i] = j"
                >
                  <span class="qkey">{{ String.fromCharCode(65 + j) }}</span>{{ o }}
                </button>
              </div>
            </div>
            <div class="quiz-foot">
              <button class="btn" @click="resetQuiz">Ulangi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bread {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-3);
  margin-bottom: 14px;
}
.bread svg { color: var(--green); }
.sep { color: var(--text-4); }

.layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}
.l-nav {
  position: sticky;
  top: calc(var(--header-h) + 20px);
  padding: 14px 10px;
}
.ln-label {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-4);
  margin: 0 8px 10px;
}
.ln-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 11px;
  border-radius: 9px;
  color: var(--text-2);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
  transition: background 0.16s ease;
}
.ln-item:hover { background: var(--surface-2); }
.ln-item.active { background: var(--green-soft); color: var(--green-600); }
.ln-ic { color: var(--text-3); }
.ln-item.active .ln-ic { color: var(--green); }
.ln-main { flex: 1; display: flex; flex-direction: column; }
.ln-main em { font-style: normal; font-size: 10.5px; color: var(--green-600); }
.ln-chev { color: var(--text-4); }

.l-main { min-width: 0; display: flex; flex-direction: column; gap: 16px; }
.hero { padding: 20px; }
.hero-top { display: flex; gap: 16px; }
.hero-ic {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
}
.hero-txt { flex: 1; min-width: 0; }
.hero-txt h1 { font-size: 19px; letter-spacing: -0.02em; }
.hero-sub { font-size: 12.5px; font-weight: 600; color: var(--green-600); margin-top: 2px; }
.hero-desc { font-size: 13px; color: var(--text-3); margin-top: 8px; line-height: 1.6; }
.hero-badge { display: flex; flex-direction: column; gap: 6px; flex: none; }
.hero-prog { margin: 16px 0 14px; }
.prog-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-3); margin-bottom: 6px; }
.prog-row strong { color: var(--green-600); }
.prog-bar { height: 7px; border-radius: 99px; background: var(--surface-4); overflow: hidden; }
.prog-fill { height: 100%; border-radius: 99px; background: var(--green); transition: width 0.6s ease; }

.sec { padding-bottom: 4px; }
.sec-body { padding: 16px 20px; }
.sec-text { font-size: 13.5px; color: var(--text-2); line-height: 1.7; }
.points { margin: 10px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.points li { position: relative; padding-left: 16px; font-size: 13px; color: var(--text-3); }
.points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green-line);
}
.sec .table { margin-top: 12px; }

.goals { margin: 0; padding: 16px 20px; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.goals li { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--text-2); }
.goals svg { color: var(--green); flex: none; }

.steps { margin: 0; padding: 16px 20px 18px; list-style: none; counter-reset: step; display: flex; flex-direction: column; gap: 10px; }
.steps li { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-2); line-height: 1.6; }
.step-num {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--green-soft);
  color: var(--green-600);
  font-weight: 700;
  font-size: 12px;
  display: grid;
  place-items: center;
  flex: none;
}

.codeblock {
  margin: 4px 0 14px;
  background: #f8f9fb;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-2);
}

.quiz-body { padding: 8px 20px 18px; }
.quiz-q { margin-top: 12px; }
.quiz-text { font-size: 13.5px; font-weight: 600; color: var(--text-2); }
.quiz-opts { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
.qopt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 9px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  font-size: 13px;
  text-align: left;
  transition: all 0.16s ease;
}
.qopt:hover { border-color: var(--border-strong); background: var(--surface-2); }
.qopt.sel { border-color: var(--green); background: var(--green-soft); }
.qopt.right { border-color: var(--green); background: var(--green-soft); color: var(--green-600); }
.qopt.wrong { border-color: var(--red); background: var(--red-soft); color: var(--red); }
.qkey {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--surface-3);
  color: var(--text-3);
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex: none;
}
.qopt.sel .qkey, .qopt.right .qkey { background: var(--green); color: #fff; }
.qopt.wrong .qkey { background: var(--red); color: #fff; }
.quiz-foot { margin-top: 16px; text-align: right; }

@media (max-width: 920px) {
  .layout { grid-template-columns: 1fr; }
  .l-nav { position: static; display: flex; flex-wrap: wrap; gap: 4px; padding: 10px; }
  .ln-label { width: 100%; }
}
</style>