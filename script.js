// Navigation mobile
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Scroll navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Animation des statistiques
function animateStats() {
  const stats = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.getAttribute("data-target"))
          const duration = 2000 // 2 secondes
          const increment = target / (duration / 16) // 60 FPS
          let current = 0
 
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }

            // Formatage des nombres
            if (target >= 1000) {
              entry.target.textContent = Math.floor(current).toLocaleString()
            } else {
              entry.target.textContent = Math.floor(current)
            }
          }, 16)

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  stats.forEach((stat) => {
    observer.observe(stat)
  })
}

// Animation des cartes secteurs
function animateSectorCards() {
  const cards = document.querySelectorAll(".sector-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("fade-in-up")
          }, index * 100)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    observer.observe(card)
  })
}

// Gestion du formulaire de contact
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Récupération des données du formulaire
  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  // Simulation d'envoi (remplacer par votre logique d'envoi)
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Envoi en cours..."
  submitBtn.disabled = true
  submitBtn.classList.add("loading")

  // Simulation d'un délai d'envoi
  setTimeout(() => {
    alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.")
    contactForm.reset()

    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
  }, 2000)
})

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Compensation pour la navbar fixe
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Effet parallaxe léger pour le hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.1}px)`
  }
})

// Animation des éléments au scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".story, .pillar, .contact-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Interaction avec les cartes secteurs
document.querySelectorAll(".sector-card").forEach((card) => {
  card.addEventListener("click", () => {
    const sector = card.getAttribute("data-sector")

    // Animation de clic
    card.style.transform = "scale(0.95)"
    setTimeout(() => {
      card.style.transform = ""
    }, 150)

    // Ici vous pouvez ajouter une logique pour afficher plus d'informations
    // ou rediriger vers une page dédiée au secteur
    console.log(`Secteur sélectionné: ${sector}`)
  })
})

// Initialisation des animations
document.addEventListener("DOMContentLoaded", () => {
  animateStats()
  animateSectorCards()
  animateOnScroll()
})

// Gestion du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  // Fermer le menu mobile si la fenêtre est redimensionnée
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  }
})

// Préchargement des images
function preloadImages() {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    const imageUrl = img.src
    const imageElement = new Image()
    imageElement.src = imageUrl
  })
}

// Lancer le préchargement après le chargement de la page
window.addEventListener("load", preloadImages)
