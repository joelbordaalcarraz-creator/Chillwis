import { FormEvent, useMemo, useState } from "react"
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Camera,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  Store,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react"
import {
  Link,
  NavLink,
  Outlet,
  createBrowserRouter,
  useNavigate,
  useParams,
} from "react-router"

const FOOD_IMAGE =
  "https://images.unsplash.com/photo-1641873933980-fcff60026f50?crop=entropy&fit=max&fm=webp&q=76&w=1400"
const FOOD_IMAGE_2 =
  "https://images.unsplash.com/photo-1605490500023-b96e71486495?crop=entropy&fit=max&fm=webp&q=76&w=1000"
const FOOD_IMAGE_3 =
  "https://images.unsplash.com/photo-1613520422094-290a378bbc11?crop=entropy&fit=max&fm=webp&q=76&w=1000"
const ROOM_IMAGES = [
  "https://images.unsplash.com/photo-1784149703765-39065f05aca8?crop=entropy&fit=max&fm=webp&q=76&w=1200",
  "https://images.unsplash.com/photo-1789899099345-a447f8634f20?crop=entropy&fit=max&fm=webp&q=76&w=1200",
  "https://images.unsplash.com/photo-1769638913500-4a0b6ac4561a?crop=entropy&fit=max&fm=webp&q=76&w=1200",
]

const salons = [
  {
    id: "brasa",
    name: "Salón Brasa",
    capacity: "2–6 personas",
    image: ROOM_IMAGES[0],
    detail: "Cálido e íntimo",
  },
  {
    id: "terraza",
    name: "Terraza Chilwis",
    capacity: "2–8 personas",
    image: ROOM_IMAGES[1],
    detail: "Aire libre y buena vibra",
  },
  {
    id: "familia",
    name: "Salón Familia",
    capacity: "6–16 personas",
    image: ROOM_IMAGES[2],
    detail: "Para celebrar juntos",
  },
]

const dishes = [
  {
    name: "Pollo clásico",
    description: "Pollo a la brasa, papas nativas y ensalada de la casa.",
    price: "S/ 48",
    image: FOOD_IMAGE,
  },
  {
    name: "Mostrito Chilwis",
    description: "Arroz chaufa, papas crocantes y 1/4 de pollo a la brasa.",
    price: "S/ 29",
    image: FOOD_IMAGE_2,
  },
  {
    name: "Alitas bravas",
    description: "8 alitas bañadas en salsa de ají ahumado y papas.",
    price: "S/ 26",
    image: FOOD_IMAGE_3,
  },
]

const carouselImages = [
  { src: "/carrusel/mostro.webp", alt: "Mostrito Chilwis" },
  { src: "/carrusel/cebolla.webp", alt: "Pollo a la brasa con cebolla" },
  { src: "/carrusel/bandeja.webp", alt: "Bandeja de pollo a la brasa" },
  { src: "/carrusel/acevichada.webp", alt: "Pollo acevichado" },
  { src: "/carrusel/tacos.webp", alt: "Tacos Chilwis" },
  { src: "/carrusel/simple.webp", alt: "Pollo a la brasa" },
  { src: "/carrusel/salchipapa.webp", alt: "Salchipapa Chilwis" },
  { src: "/carrusel/piesas.webp", alt: "Piezas de pollo a la brasa" },
]

function Logo() {
  return (
    <Link to="/" className="logo-link" aria-label="Chilwis, inicio">
      <img src="/assets/chilwis-logo.webp" alt="Chilwis" />
    </Link>
  )
}

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}: {
  children: React.ReactNode
  variant?: "primary" | "dark" | "outline" | "ghost"
  type?: "button" | "submit"
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ["/", "Inicio"],
    ["/reservas", "Reservas"],
    ["/carta", "Carta"],
    ["/contacto", "Contáctanos"],
  ]
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav
          className={open ? "main-nav nav-open" : "main-nav"}
          aria-label="Navegación principal"
        >
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/delivery"
            className="btn btn-primary nav-delivery"
            onClick={() => setOpen(false)}
          >
            <ShoppingBag size={18} /> Delivery
          </Link>
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Logo />
          <p>El sabor que reúne a todos.</p>
        </div>
        <div>
          <strong>Visítanos</strong>
          <p>Av. Los Sabores 425, Lima</p>
          <p>Lun – Dom · 12:00 a 23:00</p>
        </div>
        <div>
          <strong>Conversemos</strong>
          <p>(01) 555 0142</p>
          <div className="social-row">
            <Camera size={20} />
            <MessageCircle size={20} />
          </div>
        </div>
        <Link to="/admin" className="admin-link">
          <LayoutDashboard size={17} /> Acceso administrador
        </Link>
      </div>
      <div className="footer-bottom">© 2025 Chilwis. Hecho con sazón.</div>
    </footer>
  )
}

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <img src="/portada.webp" alt="Portada de Chilwis" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow light">Sabor, fuego y familia</div>
          <h1>
            Una brasa.
            <br />
            Mil momentos.
          </h1>
          <p>
            Pollo jugoso, papas crocantes y ese sabor de siempre que convierte
            cualquier mesa en una celebración.
          </p>
          <div className="hero-actions">
            <Link to="/carta" className="btn btn-primary">
              Ver la carta <ArrowRight size={18} />
            </Link>
            <Link to="/reservas" className="btn btn-glass">
              Reservar una mesa
            </Link>
          </div>
        </div>
        <div className="hero-badge">
          <Star fill="currentColor" size={17} /> 4.9 · Favorito local
        </div>
      </section>

      <section className="section intro-grid">
        <div className="intro-image-wrap">
          <img
            className="intro-image"
            src="/pollo.webp"
            alt="Pollo a la brasa recién preparado"
          />
        </div>
        <div className="intro-copy">
          <div className="eyebrow">Nuestro secreto</div>
          <h2>La brasa nos une</h2>
          <p className="lead">
            En Chilwis hacemos las cosas sin apuro: marinamos cada pollo por 24
            horas y lo doramos lentamente al carbón.
          </p>
          <p className="muted">
            Recetas honestas, ingredientes frescos y porciones que invitan a
            compartir.
          </p>
        </div>
      </section>

      <section className="section intro-grid">
        <div className="intro-copy">
          <div className="eyebrow">El favorito crocante</div>
          <h2>Todo el sabor del crispy</h2>
          <p className="lead">
            Pollo crispy dorado y crujiente por fuera, suave y jugoso por
            dentro.
          </p>
          <p className="muted">
            Acompáñalo con papas crocantes y tus salsas favoritas para disfrutar
            cada bocado.
          </p>
        </div>
        <div className="intro-image-wrap">
          <img
            className="intro-image"
            src="/crispy.webp"
            alt="Pollo crispy dorado y crujiente"
          />
        </div>
      </section>

      <section className="dish-carousel-section">
        <div className="section-heading carousel-heading">
          <div>
            <div className="eyebrow">Los imperdibles</div>
            <h2>Elegidos por todos</h2>
          </div>
          <Link to="/carta" className="text-link">
            Ver carta completa <ArrowRight size={18} />
          </Link>
        </div>
        <div
          className="dish-carousel"
          role="region"
          aria-label="Galería de platos"
        >
          <div className="dish-carousel-track">
            {[false, true].map((duplicate) => (
              <div
                className="dish-carousel-group"
                aria-hidden={duplicate || undefined}
                key={String(duplicate)}
              >
                {carouselImages.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={duplicate ? "" : image.alt}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-band">
        <div className="feature-image">
          <img src="/crocante.webp" alt="Pollo a la brasa crocante Chilwis" />
        </div>
        <div className="feature-copy">
          <div className="eyebrow light">El favorito de la casa</div>
          <h2>
            Más crocante.
            <br />
            Más jugoso.
          </h2>
          <p>
            Nuestro pollo a la brasa llega con papas nativas, ensalada fresca y
            todas las cremas de la casa.
          </p>
          <Link to="/delivery" className="text-link light">
            Pídelo ahora <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}

function DishCard({ name, description, price, image }: typeof dishes[number]) {
  return (
    <article className="dish-card">
      <img src={image} alt={name} />
      <div className="dish-info">
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <strong>{price}</strong>
      </div>
    </article>
  )
}

function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <section className="page-intro">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

function ReservationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tu mesa te espera"
        title="Elige tu ambiente"
        text="Cada ocasión tiene su lugar. Selecciona el salón que prefieras y prepara tu visita."
      />
      <section className="section room-grid">
        {salons.map((salon, index) => (
          <Link
            to={`/reservas/${salon.id}`}
            className={`room-card room-${index + 1}`}
            key={salon.id}
          >
            <img src={salon.image} alt={salon.name} />
            <div className="room-overlay" />
            <div className="room-content">
              <span>{salon.detail}</span>
              <h2>{salon.name}</h2>
              <p>
                <Users size={17} /> {salon.capacity}
              </p>
              <div className="round-arrow">
                <ArrowRight />
              </div>
            </div>
          </Link>
        ))}
      </section>
      <section className="reservation-note">
        <Phone />
        <div>
          <strong>¿Una reunión de más de 16 personas?</strong>
          <p>Llámanos al (01) 555 0142 y la organizamos contigo.</p>
        </div>
      </section>
    </>
  )
}

function BookingPage() {
  const { roomId } = useParams()
  const salon = salons.find((item) => item.id === roomId) ?? salons[0]
  const navigate = useNavigate()
  const [people, setPeople] = useState(2)
  const [selectedDay, setSelectedDay] = useState(1)
  const [time, setTime] = useState("19:30")
  const [done, setDone] = useState(false)
  const days = [
    ["Lun", "21"],
    ["Mar", "22"],
    ["Mié", "23"],
    ["Jue", "24"],
    ["Vie", "25"],
    ["Sáb", "26"],
    ["Dom", "27"],
  ]

  function confirmBooking() {
    setDone(true)
  }

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <img src={salon.image} alt={salon.name} />
        <div className="booking-shade" />
        <button className="back-link" onClick={() => navigate("/reservas")}>
          <ChevronLeft /> Ver otros ambientes
        </button>
        <div>
          <span>{salon.detail}</span>
          <h1>{salon.name}</h1>
          <p>
            <Users size={18} /> {salon.capacity}
          </p>
        </div>
      </section>
      <section className="booking-shell">
        {done ? (
          <div className="success-card">
            <div className="success-icon">
              <Check />
            </div>
            <div className="eyebrow">Reserva solicitada</div>
            <h2>¡Nos vemos pronto!</h2>
            <p>
              Tu mesa en {salon.name} para {people} personas quedó separada el{" "}
              {days[selectedDay][0]} {days[selectedDay][1]} a las {time}.
            </p>
            <Button onClick={() => navigate("/")}>Volver al inicio</Button>
          </div>
        ) : (
          <>
            <div className="booking-heading">
              <div>
                <div className="eyebrow">Completa tu reserva</div>
                <h2>¿Cuándo vienes?</h2>
              </div>
              <span>Paso 2 de 2</span>
            </div>
            <div className="booking-block">
              <div className="block-title">
                <span>01</span>
                <div>
                  <h3>Número de personas</h3>
                  <p>¿Cuántos serán?</p>
                </div>
              </div>
              <div className="counter">
                <button
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  aria-label="Quitar una persona"
                >
                  <Minus />
                </button>
                <strong>{people}</strong>
                <span>personas</span>
                <button
                  onClick={() => setPeople(Math.min(16, people + 1))}
                  aria-label="Agregar una persona"
                >
                  <Plus />
                </button>
              </div>
            </div>
            <div className="booking-block">
              <div className="block-title">
                <span>02</span>
                <div>
                  <h3>Fecha</h3>
                  <p>Octubre 2025</p>
                </div>
              </div>
              <div className="week-row">
                {days.map(([day, date], index) => (
                  <button
                    className={selectedDay === index ? "day active" : "day"}
                    key={date}
                    onClick={() => setSelectedDay(index)}
                  >
                    <span>{day}</span>
                    <strong>{date}</strong>
                  </button>
                ))}
                <label
                  className="calendar-picker"
                  aria-label="Elegir otra fecha"
                >
                  <CalendarDays />
                  <span>Otra fecha</span>
                  <input type="date" onChange={() => setSelectedDay(-1)} />
                </label>
              </div>
            </div>
            <div className="booking-block">
              <div className="block-title">
                <span>03</span>
                <div>
                  <h3>Horario</h3>
                  <p>Selecciona una hora disponible</p>
                </div>
              </div>
              <div className="time-grid">
                {["12:30", "13:30", "14:30", "19:30", "20:30", "21:30"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setTime(item)}
                      className={time === item ? "time active" : "time"}
                    >
                      <Clock3 /> {item}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="booking-submit">
              <div>
                <strong>Sin pago por adelantado</strong>
                <p>Confirmaremos tu reserva por WhatsApp.</p>
              </div>
              <Button onClick={confirmBooking}>
                Confirmar reserva <ArrowRight size={18} />
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function MenuPage() {
  const [filter, setFilter] = useState("Todos")
  const filters = ["Todos", "Brasas", "Combos", "Piqueos", "Bebidas"]
  return (
    <>
      <PageIntro
        eyebrow="Nuestra carta"
        title="Antojos para compartir"
        text="Clásicos de la brasa y combinaciones hechas para disfrutar sin apuro."
      />
      <section className="section menu-section">
        <div className="filter-row">
          {filters.map((item) => (
            <button
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {[...dishes, ...dishes].map((dish, index) => (
            <DishCard key={`${dish.name}-${index}`} {...dish} />
          ))}
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <section className="contact-page">
      <div className="contact-panel">
        <div className="eyebrow light">Hablemos</div>
        <h1>Siempre hay un lugar en nuestra mesa.</h1>
        <p>
          ¿Tienes una consulta, quieres celebrar algo especial o simplemente
          decir hola?
        </p>
        <div className="contact-items">
          <div>
            <MapPin />
            <span>
              <strong>Visítanos</strong>Av. Los Sabores 425, Lima
            </span>
          </div>
          <div>
            <Phone />
            <span>
              <strong>Llámanos</strong>(01) 555 0142
            </span>
          </div>
          <div>
            <Clock3 />
            <span>
              <strong>Horario</strong>Lun – Dom · 12:00 a 23:00
            </span>
          </div>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault()
          setSent(true)
        }}
      >
        <div className="eyebrow">Escríbenos</div>
        <h2>{sent ? "¡Mensaje enviado!" : "Cuéntanos, te leemos"}</h2>
        {sent ? (
          <div className="sent-message">
            <Check />
            <p>Gracias por escribirnos. Te responderemos muy pronto.</p>
          </div>
        ) : (
          <>
            <label>
              Nombre
              <input required placeholder="Tu nombre" />
            </label>
            <label>
              Correo
              <input required type="email" placeholder="hola@ejemplo.com" />
            </label>
            <label>
              Mensaje
              <textarea
                required
                rows={5}
                placeholder="¿En qué podemos ayudarte?"
              />
            </label>
            <Button type="submit">
              Enviar mensaje <ArrowRight size={18} />
            </Button>
          </>
        )}
      </form>
    </section>
  )
}

function DeliveryPage() {
  const [quantity, setQuantity] = useState(1)
  return (
    <>
      <PageIntro
        eyebrow="Delivery Chilwis"
        title="La brasa llega a ti"
        text="Pide tus favoritos y recíbelos calientes, crocantes y listos para compartir."
      />
      <section className="section delivery-layout">
        <div className="delivery-list">
          {dishes.map((dish) => (
            <article className="delivery-item" key={dish.name}>
              <img src={dish.image} alt={dish.name} />
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <strong>{dish.price}</strong>
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label={`Agregar ${dish.name}`}
              >
                <Plus />
              </button>
            </article>
          ))}
        </div>
        <aside className="cart-card">
          <ShoppingBag />
          <h2>Tu pedido</h2>
          <p>
            {quantity} producto{quantity !== 1 ? "s" : ""} en tu bolsa
          </p>
          <div>
            <span>Subtotal</span>
            <strong>S/ {quantity * 48}</strong>
          </div>
          <Button>Continuar pedido</Button>
          <small>Entrega estimada: 35–45 min</small>
        </aside>
      </section>
    </>
  )
}

type AdminDish = {
  name: string
  category: string
  price: string
}

function AdminPage() {
  const [tab, setTab] = useState("platos")
  const [adminDishes, setAdminDishes] = useState<AdminDish[]>([
    { name: "Pollo clásico", category: "Brasas", price: "48.00" },
    { name: "Mostrito Chilwis", category: "Combos", price: "29.00" },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newDish, setNewDish] = useState<AdminDish>({
    name: "",
    category: "Brasas",
    price: "",
  })
  const stats = useMemo(
    () => [
      { label: "Pedidos hoy", value: "18", icon: ShoppingBag },
      { label: "Reservas hoy", value: "12", icon: CalendarDays },
      {
        label: "Platos activos",
        value: String(adminDishes.length),
        icon: UtensilsCrossed,
      },
    ],
    [adminDishes.length],
  )

  function addDish(event: FormEvent) {
    event.preventDefault()
    setAdminDishes([...adminDishes, newDish])
    setNewDish({ name: "", category: "Brasas", price: "" })
    setShowForm(false)
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Logo />
        <div className="admin-label">Administración</div>
        <nav>
          <button
            className={tab === "platos" ? "active" : ""}
            onClick={() => setTab("platos")}
          >
            <ChefHat /> Platos
          </button>
          <button
            className={tab === "reservas" ? "active" : ""}
            onClick={() => setTab("reservas")}
          >
            <CalendarDays /> Reservas <span>12</span>
          </button>
          <button
            className={tab === "pedidos" ? "active" : ""}
            onClick={() => setTab("pedidos")}
          >
            <ShoppingBag /> Pedidos <span>18</span>
          </button>
        </nav>
        <Link to="/">
          <Store /> Ver sitio web
        </Link>
      </aside>
      <main className="admin-main">
        <div className="admin-top">
          <div>
            <div className="eyebrow">Panel de control</div>
            <h1>Hola, equipo Chilwis</h1>
          </div>
          <div className="avatar">CH</div>
        </div>
        <div className="stat-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <stat.icon />
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
        <section className="admin-content">
          {tab === "platos" && (
            <>
              <div className="admin-section-head">
                <div>
                  <h2>Platos de la carta</h2>
                  <p>Administra los productos visibles para tus clientes.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                  <Plus /> Agregar plato
                </Button>
              </div>
              {showForm && (
                <form className="add-form" onSubmit={addDish}>
                  <label>
                    Nombre
                    <input
                      required
                      value={newDish.name}
                      onChange={(e) =>
                        setNewDish({ ...newDish, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Categoría
                    <select
                      value={newDish.category}
                      onChange={(e) =>
                        setNewDish({ ...newDish, category: e.target.value })
                      }
                    >
                      <option>Brasas</option>
                      <option>Combos</option>
                      <option>Piqueos</option>
                    </select>
                  </label>
                  <label>
                    Precio
                    <input
                      required
                      type="number"
                      value={newDish.price}
                      onChange={(e) =>
                        setNewDish({ ...newDish, price: e.target.value })
                      }
                    />
                  </label>
                  <Button type="submit">Guardar plato</Button>
                </form>
              )}
              <div className="admin-table">
                {adminDishes.map((dish) => (
                  <div className="table-row" key={dish.name}>
                    <div className="dish-thumb">
                      <UtensilsCrossed />
                    </div>
                    <div>
                      <strong>{dish.name}</strong>
                      <span>{dish.category}</span>
                    </div>
                    <span className="status">Activo</span>
                    <strong>S/ {dish.price}</strong>
                    <button>Editar</button>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "reservas" && (
            <DataTable
              title="Reservas recientes"
              columns={["Cliente", "Ambiente", "Fecha", "Personas", "Estado"]}
              rows={[
                [
                  "María Salas",
                  "Salón Brasa",
                  "Hoy · 19:30",
                  "4",
                  "Confirmada",
                ],
                [
                  "Carlos Peña",
                  "Terraza Chilwis",
                  "Hoy · 20:30",
                  "6",
                  "Pendiente",
                ],
                [
                  "Lucía Torres",
                  "Salón Familia",
                  "Mañana · 13:30",
                  "10",
                  "Confirmada",
                ],
              ]}
            />
          )}
          {tab === "pedidos" && (
            <DataTable
              title="Pedidos ingresados"
              columns={["Pedido", "Cliente", "Total", "Hora", "Estado"]}
              rows={[
                ["#1048", "Diego R.", "S/ 77.00", "12:42", "Preparando"],
                ["#1047", "Ana M.", "S/ 48.00", "12:35", "En camino"],
                ["#1046", "Rosa P.", "S/ 96.00", "12:18", "Entregado"],
              ]}
            />
          )}
        </section>
      </main>
    </div>
  )
}

function DataTable({
  title,
  columns,
  rows,
}: {
  title: string
  columns: string[]
  rows: string[][]
}) {
  return (
    <>
      <div className="admin-section-head">
        <div>
          <h2>{title}</h2>
          <p>Información actualizada en tiempo real.</p>
        </div>
      </div>
      <div className="data-table">
        <div className="data-row header">
          {columns.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {rows.map((row) => (
          <div className="data-row" key={row[0]}>
            {row.map((item, index) => (
              <span
                className={index === row.length - 1 ? "status" : ""}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function NotFound() {
  return (
    <div className="not-found">
      <ChefHat />
      <h1>Página no encontrada</h1>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "reservas", Component: ReservationsPage },
      { path: "carta", Component: MenuPage },
      { path: "contacto", Component: ContactPage },
      { path: "delivery", Component: DeliveryPage },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/reservas/:roomId", Component: BookingPage },
  { path: "/admin", Component: AdminPage },
])
