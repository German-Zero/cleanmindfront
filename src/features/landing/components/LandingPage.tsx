import Link from "next/link"
import IconCalendar from "@/components/ui/icons/IconCalendar"
import IconMatriz from "@/components/ui/icons/IconMatriz"
import IconPomodoro from "@/components/ui/icons/IconPomodoro"
import IconShield from "@/components/ui/icons/IconShield"
import IconStore from "@/components/ui/icons/IconStore"
import IconTheme from "@/components/ui/icons/IconTheme"
import IconWhiteboard from "@/components/ui/icons/IconWhiteboard"
import {
    journeySteps,
    landingFeatures,
    landingNavigation,
    paletteSamples,
    rewardCategories,
    securityFeatures,
    type LandingFeatureIcon,
} from "../data/landing-content"
import styles from "../styles/Landing.module.css"
import BrandMark from "./BrandMark"
import HeroPreview from "./HeroPreview"
import { Reveal, ScrollProgress } from "./LandingMotion"

function FeatureIcon({ icon }: { icon: LandingFeatureIcon }) {
    if (icon === "calendar") return <IconCalendar />
    if (icon === "matrix") return <IconMatriz />
    if (icon === "pomodoro") return <IconPomodoro />
    return <IconWhiteboard />
}

function ArrowIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" />
        </svg>
    )
}

export default function LandingPage() {
    return (
        <div className={styles.page}>
            <ScrollProgress />
            <a href="#contenido" className={styles.skipLink}>
                Ir al contenido
            </a>

            <div className={styles.ambient} aria-hidden="true">
                <span className={styles.ambientGrid} />
                <span className={styles.ambientOrbit} />
                <span className={styles.ambientGlow} />
            </div>

            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link
                        href="/"
                        className={styles.brandLink}
                        aria-label="CleanMind, inicio"
                    >
                        <BrandMark compact />
                    </Link>

                    <nav
                        className={styles.navigation}
                        aria-label="Navegación principal"
                    >
                        {landingNavigation.map((item) => (
                            <a key={item.href} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className={styles.headerActions}>
                        <Link href="/login" className={styles.loginLink}>
                            Ingresar
                        </Link>
                        <Link href="/register" className={styles.headerCta}>
                            Comenzar
                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </header>

            <main id="contenido" tabIndex={-1}>
                <section className={styles.hero} aria-labelledby="hero-title">
                    <Reveal className={styles.heroCopy}>
                        <p className={styles.eyebrow}>
                            <span aria-hidden="true" />
                            Organiza · Prioriza · Enfócate
                        </p>
                        <h1 id="hero-title" className={styles.heroTitle}>
                            Mente limpia,
                            <span>conciencia tranquila.</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Organiza lo que tienes en mente, decide qué importa
                            y avanza de una tarea por vez en un espacio diseñado
                            para reducir el ruido.
                        </p>

                        <div className={styles.heroActions}>
                            <Link href="/register" className={styles.primaryCta}>
                                Comenzar con calma
                                <ArrowIcon />
                            </Link>
                            <Link href="/login" className={styles.secondaryCta}>
                                Ya tengo una cuenta
                            </Link>
                        </div>

                        <ul className={styles.heroSignals} aria-label="Funciones principales">
                            <li>Calendario</li>
                            <li>Matriz</li>
                            <li>Pomodoro</li>
                            <li>Pizarra</li>
                        </ul>
                    </Reveal>

                    <Reveal className={styles.heroVisual} delay={0.12}>
                        <HeroPreview />
                    </Reveal>

                    <div className={styles.heroNote} aria-hidden="true">
                        <span>01</span>
                        <i />
                        <span>Tu espacio, a tu ritmo</span>
                    </div>
                </section>

                <section
                    id="recorrido"
                    className={styles.journeySection}
                    aria-labelledby="journey-title"
                >
                    <Reveal className={styles.sectionHeading}>
                        <div>
                            <p className={styles.sectionLabel}>Un recorrido simple</p>
                            <h2 id="journey-title">
                                De lo que abruma
                                <span>a lo que puedes hacer ahora.</span>
                            </h2>
                        </div>
                        <p>
                            CleanMind no agrega otra lista para mantener. Te
                            ayuda a convertir pendientes dispersos en una
                            secuencia concreta y visible.
                        </p>
                    </Reveal>

                    <ol className={styles.journeyGrid}>
                        {journeySteps.map((step, index) => (
                            <li key={step.number}>
                                <Reveal
                                    className={styles.journeyItem}
                                    delay={index * 0.06}
                                >
                                    <div className={styles.journeyTopline}>
                                        <span>{step.number}</span>
                                        <i aria-hidden="true" />
                                    </div>
                                    <p>{step.eyebrow}</p>
                                    <h3>{step.title}</h3>
                                    <p className={styles.journeyDescription}>
                                        {step.description}
                                    </p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </section>

                <section
                    id="herramientas"
                    className={styles.featuresSection}
                    aria-labelledby="features-title"
                >
                    <Reveal className={styles.featureIntro}>
                        <p className={styles.sectionLabel}>Un mismo espacio</p>
                        <h2 id="features-title">
                            Herramientas que se conectan,
                            <span>sin hacerse ruido entre sí.</span>
                        </h2>
                    </Reveal>

                    <div className={styles.featureGrid}>
                        {landingFeatures.map((feature, index) => (
                            <Reveal
                                key={feature.id}
                                className={`${styles.featureCard} ${styles[feature.tone]}`}
                                delay={index * 0.05}
                            >
                                <article aria-labelledby={`feature-${feature.id}`}>
                                    <div className={styles.featureCardHeader}>
                                        <span
                                            className={styles.featureIcon}
                                            aria-hidden="true"
                                        >
                                            <FeatureIcon icon={feature.icon} />
                                        </span>
                                        <span className={styles.featureNumber}>
                                            {feature.number}
                                        </span>
                                    </div>
                                    <p className={styles.featureEyebrow}>
                                        {feature.eyebrow}
                                    </p>
                                    <h3 id={`feature-${feature.id}`}>
                                        {feature.title}
                                    </h3>
                                    <p className={styles.featureDescription}>
                                        {feature.description}
                                    </p>
                                    <ul>
                                        {feature.highlights.map((highlight) => (
                                            <li key={highlight}>{highlight}</li>
                                        ))}
                                    </ul>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section
                    id="personalizacion"
                    className={styles.personalizationSection}
                    aria-labelledby="personalization-title"
                >
                    <Reveal className={styles.personalizationCopy}>
                        <span className={styles.largeSectionIcon} aria-hidden="true">
                            <IconTheme theme="LUNAR_MIND" />
                        </span>
                        <p className={styles.sectionLabel}>Un entorno propio</p>
                        <h2 id="personalization-title">
                            Haz que el espacio
                            <span>se sienta realmente tuyo.</span>
                        </h2>
                        <p>
                            Elige entre seis paletas incluidas y fondos con
                            movimiento. Cuando completas tareas y sesiones de
                            enfoque, puedes desbloquear nuevos detalles visuales.
                        </p>
                        <p className={styles.motionNote}>
                            <span aria-hidden="true">◎</span>
                            Las animaciones respetan la reducción de movimiento
                            de tu dispositivo.
                        </p>
                    </Reveal>

                    <Reveal className={styles.personalizationVisual} delay={0.1}>
                        <div className={styles.paletteHeader}>
                            <div>
                                <span>Paletas incluidas</span>
                                <strong>Tu ambiente</strong>
                            </div>
                            <span className={styles.paletteCount}>06</span>
                        </div>
                        <ul className={styles.paletteList}>
                            {paletteSamples.map((palette) => (
                                <li key={palette.name}>
                                    <div className={styles.swatches} aria-hidden="true">
                                        {palette.colors.map((color) => (
                                            <span
                                                key={color}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <span>{palette.name}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.rewardShelf}>
                            <div className={styles.rewardShelfTitle}>
                                <span aria-hidden="true"><IconStore /></span>
                                <div>
                                    <strong>Recompensas visuales</strong>
                                    <small>Previsualiza antes de canjear</small>
                                </div>
                            </div>
                            <ul>
                                {rewardCategories.map((category) => (
                                    <li key={category}>{category}</li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </section>

                <section
                    id="seguridad"
                    className={styles.securitySection}
                    aria-labelledby="security-title"
                >
                    <Reveal className={styles.securityIntro}>
                        <span className={styles.largeSectionIcon} aria-hidden="true">
                            <IconShield />
                        </span>
                        <p className={styles.sectionLabel}>Tu cuenta, bajo tu control</p>
                        <h2 id="security-title">
                            Entra con seguridad.
                            <span>Recibe solo lo que necesitas.</span>
                        </h2>
                        <p>
                            CleanMind te permite elegir cómo acceder y qué
                            recordatorios acompañan tu rutina.
                        </p>
                    </Reveal>

                    <div className={styles.securityList}>
                        {securityFeatures.map((feature, index) => (
                            <Reveal
                                key={feature.number}
                                className={styles.securityItem}
                                delay={index * 0.06}
                            >
                                <article>
                                    <span>{feature.number}</span>
                                    <div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className={styles.finalCta} aria-labelledby="final-cta-title">
                    <Reveal className={styles.finalCtaInner}>
                        <p className={styles.sectionLabel}>Tu siguiente paso</p>
                        <h2 id="final-cta-title">
                            Menos cosas compitiendo
                            <span>por tu atención.</span>
                        </h2>
                        <p>
                            Empieza con una tarea. Lo demás puede esperar su turno.
                        </p>
                        <div className={styles.finalActions}>
                            <Link href="/register" className={styles.primaryCta}>
                                Ver disponibilidad
                                <ArrowIcon />
                            </Link>
                            <Link href="/login" className={styles.textLink}>
                                Ingresar a mi espacio
                            </Link>
                        </div>
                    </Reveal>
                </section>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <BrandMark />
                    <nav
                        className={styles.footerLinks}
                        aria-label="Enlaces del pie de página"
                    >
                        <Link href="/beta">Privacidad y participación</Link>
                        <Link href="/login">Ingresar</Link>
                        <Link href="/register">Crear cuenta</Link>
                    </nav>
                    <p>© 2026 Germán Naz</p>
                </div>
            </footer>
        </div>
    )
}
