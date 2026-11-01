import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "hemayat13_campaign_stats";
const DEFAULT_STATS = { collected: 6500000, goal: 10000000, supporters: 42 };

function readStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return DEFAULT_STATS;
    return {
      collected: Math.max(0, Number(saved.collected) || 0),
      goal: Math.max(1, Number(saved.goal) || DEFAULT_STATS.goal),
      supporters: Math.max(0, Number(saved.supporters) || 0),
    };
  } catch {
    return DEFAULT_STATS;
  }
}

const money = (value) => `${Math.round(value).toLocaleString("fa-IR")} تومان`;

function DonationCard() {
  const [stats, setStats] = useState(readStats);
  const [displayedAmount, setDisplayedAmount] = useState(stats.collected);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [draft, setDraft] = useState(stats);
  const [notice, setNotice] = useState("");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); }
    catch { return {}; }
  });

  const percentage = useMemo(
    () => Math.min(100, Math.max(0, (stats.collected / Math.max(1, stats.goal)) * 100)),
    [stats.collected, stats.goal]
  );

  useEffect(() => {
    const sync = () => {
      setStats(readStats());
      try { setUser(JSON.parse(localStorage.getItem("user") || "{}")); } catch { setUser({}); }
    };
    window.addEventListener("storage", sync);
    window.addEventListener("hemayat13-stats-updated", sync);
    window.addEventListener("hemayat13-auth-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("hemayat13-stats-updated", sync);
      window.removeEventListener("hemayat13-auth-updated", sync);
    };
  }, []);

  useEffect(() => {
    const start = displayedAmount;
    const end = stats.collected;
    if (start === end) return undefined;
    const duration = 850;
    const startedAt = performance.now();
    let frame;
    const animate = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedAmount(Math.round(start + (end - start) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [stats.collected]);

  const saveStats = (event) => {
    event.preventDefault();
    const next = {
      collected: Math.max(0, Number(draft.collected) || 0),
      goal: Math.max(1, Number(draft.goal) || 1),
      supporters: Math.max(0, Number(draft.supporters) || 0),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStats(next);
    setIsEditorOpen(false);
    setNotice("آمار نمایشی با موفقیت به‌روزرسانی شد.");
    window.dispatchEvent(new Event("hemayat13-stats-updated"));
  };

  const isAdmin = user?.role === "admin";

  return (
    <article className="donation-card" aria-label="وضعیت پیشرفت پروژه حمایت ۱۳">
      <div className="campaign-topline">
        <span className="campaign-status"><span /> وضعیت پیشرفت پروژه</span>
        <span className="campaign-number">۰۱۳ / ۰۱</span>
      </div>
      <div className="donation-icon" aria-hidden="true">✦</div>
      <h3>برای قدم بعدی کنار هم</h3>
      <p>همراهی اعضا، مسیر پیشرفت پروژه‌های حمایت ۱۳ را هموارتر می‌کند.</p>
      <div className="progress-info"><span>درصد تحقق هدف</span><strong>{percentage.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}٪</strong></div>
      <div className="progress-bar" role="progressbar" aria-label="درصد تحقق هدف مالی" aria-valuenow={Math.round(percentage)} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-value" style={{ width: `${percentage}%` }} />
      </div>
      <div className="progress-bottom">
        <span>{money(displayedAmount)} جمع‌شده</span>
        <span>هدف: {money(stats.goal)}</span>
      </div>
      <div className="campaign-supporters">{stats.supporters.toLocaleString("fa-IR")} همراه در این مسیر</div>
      <Link to="/donate" className="primary-button full-button">مشاهده روش‌های حمایت <span aria-hidden="true">←</span></Link>
      <small className="card-demo-note">آمار فعلی آزمایشی است و هنوز به پرداخت آنلاین متصل نیست.</small>

      {isAdmin && (
        <div className="campaign-admin-tools">
          <button type="button" className="campaign-edit-toggle" onClick={() => { setDraft(stats); setNotice(""); setIsEditorOpen((open) => !open); }}>
            {isEditorOpen ? "بستن ویرایش" : "ویرایش آمار پروژه"}
          </button>
          {isEditorOpen && (
            <form className="campaign-editor" onSubmit={saveStats}>
              <label>مبلغ جمع‌شده (تومان)<input type="number" min="0" step="1000" value={draft.collected} onChange={(e) => setDraft({ ...draft, collected: e.target.value })} /></label>
              <label>هدف کل (تومان)<input type="number" min="1" step="1000" value={draft.goal} onChange={(e) => setDraft({ ...draft, goal: e.target.value })} /></label>
              <label>تعداد همراهان<input type="number" min="0" step="1" value={draft.supporters} onChange={(e) => setDraft({ ...draft, supporters: e.target.value })} /></label>
              <button type="submit" className="campaign-save-button">ذخیره تغییرات</button>
            </form>
          )}
          {notice && <p className="campaign-editor-notice" role="status">{notice}</p>}
        </div>
      )}
    </article>
  );
}

export default DonationCard;
