import { useAuth } from "../context/AuthContext";

export default function LandingPage({ navigate }) {
    const { token } = useAuth();

    const handleStart = () => {
        if (token) navigate("home");
        else navigate("login");
    };

    return (
        <div className="ff-root">

            {/* NAV */}
            <div className="ff-nav">
                <div className="ff-nav-inner">
                    <div className="ff-logo">
                        Fund<span className="ff-gold">forge</span>
                    </div>

                    <button className="ff-nav-cta" onClick={handleStart}>
                        Launch Campaign
                    </button>
                </div>
            </div>

            {/* HERO */}
            <section className="ff-hero">
                <div className="ff-hero-glow" />

                <div className="ff-hero-inner">
                    <div className="ff-eyebrow">
                        <span className="ff-eyebrow-dot"></span>
                        Crowdfunding platform
                    </div>

                    <h1 className="ff-headline">
                        Fund<span className="ff-forge ff-gold">forge</span>
                    </h1>

                    <p className="ff-tagline">
                        Turn ideas into impact.
                    </p>

                    <p className="ff-description">
                        Empower communities through crowdfunding. Build and launch meaningful
                        projects with support from people who believe in your vision.
                    </p>

                    <button className="ff-cta" onClick={handleStart}>
                        Start a Campaign
                        <span className="ff-cta-arrow">→</span>
                    </button>
                </div>

                <div className="ff-divider" />
            </section>

            {/* HOW IT WORKS */}
            <section className="ff-section">
                <div className="ff-section-inner">
                    <p className="ff-section-eyebrow">How it works</p>
                    <h2 className="ff-section-title">
                        Launch in minutes. Grow with support.
                    </h2>

                    <div className="ff-steps">
                        <div className="ff-step">
                            <span className="ff-step-number">01</span>
                            <h3 className="ff-step-title">Create your campaign</h3>
                            <p className="ff-step-body">
                                Describe your idea, set a goal, and share your vision with the world.
                            </p>
                        </div>

                        <div className="ff-step">
                            <span className="ff-step-number">02</span>
                            <h3 className="ff-step-title">Reach supporters</h3>
                            <p className="ff-step-body">
                                Share your campaign and connect with people who believe in your mission.
                            </p>
                        </div>

                        <div className="ff-step">
                            <span className="ff-step-number">03</span>
                            <h3 className="ff-step-title">Bring it to life</h3>
                            <p className="ff-step-body">
                                Use the funds to turn your idea into reality and create real impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="ff-section ff-section--alt">
                <div className="ff-section-inner">
                    <p className="ff-section-eyebrow">Why Fundforge</p>
                    <h2 className="ff-section-title">
                        Built for creators, founders, and changemakers.
                    </h2>

                    <div className="ff-features">
                        <div className="ff-feature">
                            <div className="feature-check">✓</div>
                            <div>
                                <h3 className="ff-feature-title">Simple & intuitive</h3>
                                <p className="ff-feature-body">
                                    Launch campaigns easily with a clean and guided experience.
                                </p>
                            </div>
                        </div>

                        <div className="ff-feature">
                            <div className="feature-check">✓</div>
                            <div>
                                <h3 className="ff-feature-title">Transparent funding</h3>
                                <p className="ff-feature-body">
                                    Track progress and build trust with complete visibility.
                                </p>
                            </div>
                        </div>

                        <div className="ff-feature">
                            <div className="feature-check">✓</div>
                            <div>
                                <h3 className="ff-feature-title">Community driven</h3>
                                <p className="ff-feature-body">
                                    Connect with backers who genuinely support your vision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="ff-bottom-cta">
                <div className="ff-bottom-cta-glow" />

                <div className="ff-bottom-cta-inner">
                    <h2 className="ff-bottom-title">
                        Ready to bring your idea to life?
                    </h2>

                    <p className="ff-bottom-sub">
                        Start your campaign today and make an impact.
                    </p>

                    <button className="ff-cta" onClick={handleStart}>
                        Start a Campaign →
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="ff-footer">
                <div className="ff-footer-inner">
                    <div className="ff-logo ff-logo--sm">
                        Fund<span className="ff-gold">forge</span>
                    </div>

                    <p className="ff-footer-copy">
                        © 2026 Fundforge. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}