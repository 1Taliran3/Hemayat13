import { Link } from "react-router-dom";

const features = [
  { number: "۰۱", title: "رابط فارسی و راست‌چین", text: "ساختار مناسب زبان فارسی، تایپوگرافی خوانا و مسیرهای ساده برای حرکت در سایت." },
  { number: "۰۲", title: "طراحی واکنش‌گرا", text: "چیدمان سازگار با نمایشگرهای دسکتاپ و موبایل، همراه با منوی موبایل." },
  { number: "۰۳", title: "کارت پیشرفت کمپین", text: "نمایش هدف، مبلغ نمونه، درصد پیشرفت محاسبه‌شده و شمار همراهان با امکان ویرایش نمایشی." },
  { number: "۰۴", title: "جریان کاربری چندصفحه‌ای", text: "صفحات خانه، ورود، ثبت‌نام، ثبت درخواست حمایت و داشبورد." },
];

function Project() {
  return (
    <main className="project-page">
      <section className="project-hero">
        <div className="container project-hero-grid">
          <div className="project-hero-copy">
            <span className="section-label"><i /> مطالعه موردی / نمونه‌کار فرانت‌اند</span>
            <h1>حمایت ۱۳؛<br /><span className="text-gold">از ایده تا تجربه دیجیتال</span></h1>
            <p>طراحی و پیاده‌سازی یک تجربه فارسی و راست‌چین برای معرفی یک گروه مستقل، نمایش مسیر پروژه‌ها و ارائه مسیرهای همراهی.</p>
            <div className="project-hero-actions">
              <Link to="/" className="primary-button">مشاهده صفحه اصلی <span aria-hidden="true">↗</span></Link>
              <a href="#project-details" className="secondary-button">جزئیات پروژه</a>
            </div>
            <div className="project-tags"><span>React</span><span>Vite</span><span>React Router</span><span>CSS</span><span>Vercel</span></div>
          </div>
          <div className="project-preview" aria-label="پیش‌نمایش گرافیکی کارت پروژه">
            <div className="project-preview-top"><span>HEMAYAT / 013</span><span className="preview-live-dot">● نسخه نمایشی</span></div>
            <div className="project-preview-brand"><img src="/brand-13.svg" alt="نشان حمایت ۱۳" /></div>
            <div className="project-preview-caption"><span>مسیر همراهی</span><strong>هر قدم، بخشی از یک مسیر بزرگ‌تر است.</strong></div>
            <div className="project-preview-stats">
              <div><small>پیشرفت نمونه</small><strong>۶۵٪</strong><div className="preview-progress"><i /></div></div>
              <div><small>هدف نمونه</small><strong>۱۰ میلیون</strong><small>تومان</small></div>
            </div>
            <small className="preview-disclaimer">اعداد صرفاً نمایشی هستند و پرداخت واقعی انجام نمی‌شود.</small>
          </div>
        </div>
      </section>

      <section className="project-overview" id="project-details">
        <div className="container project-overview-grid">
          <div><span className="section-label">درباره پروژه</span><h2>یک نمونه‌کار با تمرکز بر <span className="text-gold">وضوح و اعتماد</span></h2></div>
          <p>حمایت ۱۳ به‌عنوان یک پروژه مستقل طراحی شده است. هدف رابط کاربری، معرفی هویت گروه، توضیح مسیر همراهی و نمایش شفاف وضعیت نمونه یک کمپین است. این نسخه برای نمایش توانایی طراحی و توسعه رابط کاربری آماده شده و نباید به‌عنوان سامانه دریافت وجه فعال معرفی شود.</p>
        </div>
      </section>

      <section className="project-features">
        <div className="container">
          <div className="project-section-heading"><span className="section-label">قابلیت‌های پیاده‌سازی‌شده</span><h2>جزئیات تجربه کاربری</h2></div>
          <div className="project-feature-grid">
            {features.map((feature) => <article className="project-feature" key={feature.number}><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="project-stack">
        <div className="container project-stack-grid">
          <div><span className="section-label">فناوری‌ها</span><h2>ساخته‌شده با ابزارهای مدرن وب</h2><p>ساختار پروژه بر پایه React و Vite است و مسیریابی صفحات با React Router انجام می‌شود. استقرار فرانت‌اند و API در Vercel انجام شده است.</p></div>
          <div className="stack-list"><span>React 19</span><span>Vite 6</span><span>React Router</span><span>CSS</span><span>Node.js / Express API</span><span>GitHub</span><span>Vercel</span></div>
        </div>
      </section>

      <section className="project-notes">
        <div className="container project-notes-inner">
          <div><span className="section-label">شفافیت فنی</span><h2>مرزهای نسخه فعلی</h2></div>
          <ul>
            <li>آمار کمپین نمونه است و از پایگاه داده خوانده نمی‌شود.</li>
            <li>ثبت درخواست حمایت، در صورت آماده بودن API و دیتابیس، درخواست را ثبت می‌کند؛ این به معنی پرداخت وجه نیست.</li>
            <li>درگاه بانکی و انتقال پول واقعی در این نسخه فعال نیست.</li>
            <li>اتصال عملیاتی دیتابیس و صحت کامل جریان‌های ورود و ثبت درخواست باید جداگانه در محیط اجرا آزموده شود.</li>
          </ul>
        </div>
      </section>
      <section className="cta-section"><div className="container cta"><div><span className="section-label"><i /> پایان مطالعه موردی</span><h2>یک تجربه دیجیتال،<br /><span className="text-gold">با هویت مشخص.</span></h2><p>برای مشاهده طراحی و صفحات اجرایی، نسخه اصلی پروژه را باز کن.</p></div><div className="cta-actions"><Link to="/" className="primary-button">بازگشت به سایت <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}
export default Project;
