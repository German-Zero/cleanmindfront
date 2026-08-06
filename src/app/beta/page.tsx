import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Aviso de la beta | CleanMind",
    description:
        "Aviso de privacidad y condiciones de participación en la beta privada de CleanMind.",
}

export default function BetaNoticePage() {
    return (
        <main className="relative min-h-dvh overflow-hidden bg-background px-4.5 py-7 text-text-primary sm:px-7 sm:py-10">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-45 -left-35 h-105 w-105 rounded-full bg-primary/10 blur-[110px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-45 -bottom-55 h-125 w-125 rounded-full bg-accent/8 blur-[130px]"
            />

            <div className="relative mx-auto w-full max-w-225">
                <nav
                    aria-label="Navegación del aviso"
                    className="mb-4.5 flex items-center justify-between gap-4"
                >
                    <Link
                        href="/login"
                        className="text-[18px] font-semibold text-primary"
                    >
                        CleanMind
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-[9px] border border-border bg-card/55 px-3.25 py-2 text-[11px] font-medium text-text-secondary hover:border-primary/45 hover:text-text-primary"
                    >
                        Volver al registro
                    </Link>
                </nav>

                <header className="calm-panel px-5 py-6 sm:px-8.5 sm:py-8">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="calm-eyebrow">Beta privada</span>
                        <span className="rounded-full border border-border bg-card/65 px-2.25 py-1 text-[9px] text-text-secondary">
                            Versión beta-2
                        </span>
                    </div>
                    <h1 className="mt-3 max-w-190 text-[28px] leading-9 font-semibold sm:text-[34px] sm:leading-10.75">
                        Aviso de privacidad y condiciones de participación
                    </h1>
                    <p className="mt-3 max-w-180 text-[13px] leading-5.25 text-text-secondary">
                        Este documento explica qué implica probar CleanMind,
                        qué información trataremos y qué puedes esperar durante
                        esta etapa limitada a veinte participantes.
                    </p>
                    <p className="mt-3.5 text-[10px] text-text-secondary/75">
                        Última actualización: 6 de agosto de 2026
                    </p>
                </header>

                <div className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
                    {[
                        ["Acceso", "Solo por invitación"],
                        ["Edad mínima", "16 años"],
                        ["Costo", "Gratuito durante la beta"],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="calm-card px-4 py-3.5"
                        >
                            <p className="text-[9px] font-semibold tracking-[1px] text-accent uppercase">
                                {label}
                            </p>
                            <p className="mt-1 text-[12px] font-medium">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                <article className="calm-panel mt-3.5 px-5 sm:px-8.5">
                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            1. Responsable
                        </h2>
                        <div className="mt-3 grid gap-1.25 text-[12px] leading-5 text-text-secondary">
                            <p>
                                <strong className="font-medium text-text-primary">
                                    Responsable:
                                </strong>{" "}
                                German Naz
                            </p>
                            <p>
                                <strong className="font-medium text-text-primary">
                                    Domicilio:
                                </strong>{" "}
                                Pueyrredon 234, Brinkmann, Cordoba, Argentina
                            </p>
                            <p>
                                <strong className="font-medium text-text-primary">
                                    Contacto:
                                </strong>{" "}
                                <a
                                    href="mailto:germannaz_@hotmail.com"
                                    className="text-accent hover:underline"
                                >
                                    germannaz_@hotmail.com
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            2. Alcance de la beta
                        </h2>
                        <div className="mt-3 space-y-2.5 text-[12px] leading-5 text-text-secondary">
                            <p>
                                CleanMind se encuentra en desarrollo. El acceso
                                es personal, gratuito, revocable y está limitado
                                a las personas invitadas para evaluar su
                                funcionamiento.
                            </p>
                            <p>
                                Algunas funciones pueden cambiar, fallar,
                                reiniciarse o dejar de estar disponibles. No
                                guardes información médica, financiera, legal,
                                contraseñas ni ningún contenido cuya pérdida
                                pueda causarte un daño.
                            </p>
                            <p>
                                CleanMind es una herramienta de organización y
                                enfoque. No ofrece atención médica, psicológica
                                ni profesional.
                            </p>
                        </div>
                    </section>

                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            3. Información tratada
                        </h2>
                        <ul className="mt-3 grid gap-2 text-[12px] leading-5 text-text-secondary">
                            <li>
                                • Datos de cuenta: nombre, email, avatar,
                                credenciales protegidas, verificación y MFA.
                            </li>
                            <li>
                                • Contenido: tareas, descripciones, fechas,
                                matriz Eisenhower, sesiones Pomodoro y pizarra.
                            </li>
                            <li>
                                • Preferencias: apariencia, frecuencia y canales
                                de notificación.
                            </li>
                            <li>
                                • Integraciones: información básica recibida de
                                Google y Discord cuando decides vincularlos.
                            </li>
                            <li>
                                • Datos técnicos mínimos para seguridad y
                                diagnóstico, como fecha, ruta, estado, duración
                                y tipo de error. La infraestructura también
                                puede procesar IP, navegador y dispositivo.
                            </li>
                            <li>
                                • Datos de sesión: cookies técnicas protegidas
                                para autenticarte y mantener tu acceso. La cookie
                                de acceso es de corta duración y la de renovación
                                puede conservarse hasta 30 días.
                            </li>
                            <li>
                                • Registros legales: versión aceptada y fecha de
                                aceptación de este documento.
                            </li>
                        </ul>
                    </section>

                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            4. Finalidades
                        </h2>
                        <ul className="mt-3 grid gap-2 text-[12px] leading-5 text-text-secondary">
                            <li>• Crear, autenticar y proteger tu cuenta.</li>
                            <li>
                                • Guardar y sincronizar las funciones que
                                utilizas.
                            </li>
                            <li>
                                • Enviar verificaciones, recuperación de cuenta
                                y notificaciones que hayas activado.
                            </li>
                            <li>
                                • Detectar errores, abuso y problemas de
                                rendimiento.
                            </li>
                            <li>
                                • Analizar el feedback de la beta y mejorar
                                CleanMind.
                            </li>
                        </ul>
                    </section>

                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            5. Proveedores y ubicación
                        </h2>
                        <p className="mt-3 text-[12px] leading-5 text-text-secondary">
                            Para operar la beta podremos utilizar Vercel para el
                            frontend, Fly.io para la API, Supabase para la base
                            de datos, Brevo para emails, Google para el inicio
                            de sesión y Discord para las notificaciones
                            vinculadas. Fly.io y Supabase operan en São Paulo
                            según la configuración actual. Los demás proveedores
                            pueden procesar información fuera de Argentina bajo
                            sus propias políticas y medidas de seguridad.
                        </p>
                    </section>

                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            6. Conservación y control
                        </h2>
                        <div className="mt-3 space-y-2.5 text-[12px] leading-5 text-text-secondary">
                            <p>
                                Conservaremos la cuenta y su contenido mientras
                                participes en la beta. CleanMind no mantiene
                                copias de seguridad independientes durante esta
                                etapa, por lo que no garantizamos la recuperación
                                de contenido eliminado o perdido.
                            </p>
                            <p>
                                Los proveedores de infraestructura pueden
                                generar registros operativos o copias técnicas
                                temporales conforme a sus propias políticas y
                                configuraciones. No utilizamos esos registros
                                para publicidad ni perfiles comerciales.
                            </p>
                            <p>
                                Puedes solicitar acceso, corrección o
                                eliminación escribiendo al correo indicado. La
                                eliminación también puede iniciarse desde la
                                configuración de la cuenta. Podremos conservar
                                información estrictamente necesaria cuando
                                exista una obligación legal o un incidente de
                                seguridad pendiente.
                            </p>
                            <p>
                                Las solicitudes de acceso serán respondidas
                                dentro de 10 días corridos y las de rectificación,
                                actualización o supresión dentro de 5 días hábiles.
                                Si la respuesta no resulta satisfactoria, puedes
                                reclamar ante la{" "}
                                <a
                                    href="https://www.argentina.gob.ar/aaip/datospersonales/derechos"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-accent hover:underline"
                                >
                                    Agencia de Acceso a la Información Pública
                                </a>
                                .
                            </p>
                        </div>
                    </section>

                    <section className="border-b border-border/65 py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            7. Reglas de participación
                        </h2>
                        <ul className="mt-3 grid gap-2 text-[12px] leading-5 text-text-secondary">
                            <li>
                                • Debes tener al menos 16 años y proporcionar
                                información verdadera.
                            </li>
                            <li>
                                • No compartas tu cuenta, accesos de prueba,
                                códigos MFA ni enlaces privados.
                            </li>
                            <li>
                                • No intentes vulnerar, saturar, automatizar
                                abusivamente o utilizar el servicio con fines
                                ilegales.
                            </li>
                            <li>
                                • Conservas la titularidad de tu contenido y nos
                                autorizas únicamente a alojarlo y procesarlo
                                para operar CleanMind.
                            </li>
                            <li>
                                • El feedback que envíes podrá utilizarse para
                                mejorar el producto sin generar una obligación
                                de pago.
                            </li>
                        </ul>
                    </section>

                    <section className="py-6.5">
                        <h2 className="text-[17px] font-semibold">
                            8. Disponibilidad, cambios y aceptación
                        </h2>
                        <div className="mt-3 space-y-2.5 text-[12px] leading-5 text-text-secondary">
                            <p>
                                Podremos corregir, suspender o finalizar la beta
                                y retirar accesos cuando sea necesario. Cuando
                                sea razonable, avisaremos antes de eliminar
                                información. Esto no limita los derechos que la
                                ley te reconoce.
                            </p>
                            <p>
                                CleanMind no realizará cobros durante esta
                                etapa. Una futura membresía requerirá precio,
                                condiciones y aceptación separados; nunca se
                                activará automáticamente por participar en la
                                beta.
                            </p>
                            <p>
                                La versión beta-2 reemplaza a beta-1. Para seguir
                                utilizando CleanMind, las cuentas existentes
                                deberán revisar y aceptar esta actualización.
                            </p>
                            <p>
                                Al marcar la aceptación en el registro o en la
                                pantalla de actualización confirmas que leíste
                                este aviso y aceptas participar bajo su versión
                                beta-2.
                            </p>
                        </div>
                    </section>
                </article>

                <footer className="flex flex-col items-center gap-2.5 py-6 text-center">
                    <Link
                        href="/register"
                        className="calm-button-secondary inline-flex items-center justify-center"
                    >
                        Volver al registro
                    </Link>
                    <p className="text-[9px] text-text-secondary/65">
                        © {new Date().getFullYear()} German Naz. Todos los
                        derechos reservados.
                    </p>
                </footer>
            </div>
        </main>
    )
}
