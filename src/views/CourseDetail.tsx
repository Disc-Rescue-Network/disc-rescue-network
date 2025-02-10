import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Disc} from "../App";
import LogoRescueFlow2 from "../components/LogoRescueFlow2";
import "../styles/claimDisc.css";
import {useInventoryContext} from "../hooks/useInventory";
import "../styles/courseDetail.css";
import LoadingScreen from "./LoadingSceen";
import noImageFound from "../assets/newAssets/ImageNotFound.jpg";

interface CardProps {
  disc: Disc;
  showButton?: boolean;
}

export const courseFAQs = [
  {
    id: 1,
    question: "How do I pick up my disc?",
    answer:
      "To pick up your disc, contact one of our volunteers via text to coordinate a time to retrieve it. A min of 12 hours lead-time is required. Do not just show up at the course and expect to get your disc back. You can reach out to Steve Finger @ 609-280-7999 to schedule a pickup window.",
  },
  {
    id: 2,
    question: "How long do I have to claim my disc?",
    answer:
      "You must claim your disc within 120 days of the 'date found'. After this date, the disc may be marked as 'For Sale' and you may lose the ability to claim it. It's essential to take action immediately to avoid this situation if you wish to claim your disc.",
  },
  {
    id: 3,
    question: "Can I report my disc as lost?",
    answer:
      "At the moment, only administrators have the ability to add discs to the inventory. Self-reporting lost discs is not available. If you believe your disc is lost, it's advisable to check the inventory through the app or contact the course staff to inquire if it has been found.",
  },
  {
    id: 4,
    question: "What should I do if I'm unable to collect my disc?",
    answer:
      "If you find yourself unable to collect your disc, you have the option to 'surrender' it. This means your disc will be placed in our for sale bin(s), and the proceeds will go towards supporting our course. We're also working on incorporating a feature on our website that allows for disc shipping in the near future. If this option interests you, please reach out to one of our volunteers to explore its availability.",
  },
  {
    id: 5,
    question: "How do I see if my disc is in the inventory?",
    answer:
      "To check if your disc is in the inventory, navigate to the app's inventory page. You can search for your disc by name, course, or other identifying information. If your disc has been found and reported by an administrator, it will appear in the search results.",
  },
  {
    id: 6,
    question: "How do I know when my disc is added?",
    answer:
      "If your disc has a visible phone number written on it, you will be notified via text. Once a day, the system sends a text for every new disc added to the inventory.",
  },
  {
    id: 7,
    question: "How does a disc appear in the inventory?",
    answer:
      "Discs are added to the inventory by volunteers when they find a disc on the course or if one is returned in the L&F bin. The volunteer will enter the relevant information about the disc (name, color, plastic) into the system, including any information written on the disc like a persons name and phone number. This makes the disc visible in the inventory.",
  },
];

export default function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams<{id?: string}>();
  const [disc, setDisc] = useState<Disc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string | null>(null);
  const {inventory, loading, fetchInventory} = useInventoryContext();
  const [activeTab, setActiveTab] = useState("info");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const course = params.get("course");
    setCourseName(course ? decodeURIComponent(course) : null);

    if (inventory.length === 0) {
      fetchInventory(course || undefined);
    }
  }, [location.search, fetchInventory, inventory.length]);

  useEffect(() => {
    if (id && inventory.length > 0) {
      const foundDisc = inventory.find((d) => d.id === parseInt(id, 10));
      if (foundDisc) {
        setDisc(foundDisc);
      } else {
        setError("Disc not found in inventory");
      }
    }
  }, [id, inventory]);

  useEffect(() => {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    mobileMenuToggle?.classList.toggle("open", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const navigateToSearch = (course: string) => {
    const encodedCourse = encodeURIComponent(course);
    navigate(`/searchInventory?course=${encodedCourse}`);
  };

  if (loading)
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!disc) return <div>Disc not found</div>;

  const toggleMobileMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMobileMenuItemClick = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <section className="disc-info-course-detail">
            <h2>Course Information</h2>
            <div className="course-detail-group">
              <div className="info-disc">
                <div className="group-disc">
                  <div className="group-info-image">
                    <p className="info-course">
                      Course Name <span>{disc?.course?.name}</span>
                    </p>
                    <p className="info-course">
                      Address
                      <span>
                        {disc.course.city}, {disc.course.state}
                      </span>
                    </p>
                    <p className="description-image">
                      Description
                      <span className="description-course">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi excepturi porro quae expedita, fugit delectus
                        quisquam obcaecati. Esse voluptates voluptate neque quod
                        ducimus doloremque adipisci in, rerum aliquam explicabo
                        molestias. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Animi excepturi porro quae expedita,
                        fugit delectus quisquam
                      </span>
                    </p>
                  </div>
                  <div className="image-wrapper-course">
                    <img
                      src={disc.topImage || noImageFound}
                      loading="lazy"
                      alt={`${disc.disc.brand.name} ${disc.disc.name}`}
                      className="image-course-information"
                      onError={(e) => {
                        e.currentTarget.src = noImageFound;
                      }}
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </section>
        );
      case "faq":
        return (
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="accordion-course">
              {courseFAQs.map((faq) => (
                <div key={faq.id} className="accordion-item-course">
                  <h2 className="accordion-header-course">
                    <button
                      className={`accordion-button-course ${
                        openFaqId === faq.id ? "active" : ""
                      }`}
                      onClick={() => {
                        setOpenFaqId(openFaqId === faq.id ? null : faq.id);
                      }}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  {openFaqId === faq.id && (
                    <div className="accordion-collapse-course show">
                      <div className="accordion-body-course">{faq.answer}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "bulletin":
        return (
          <section className="bulletin-board">
            <h2>Bulletin Board</h2>
          </section>
        );
      case "donation":
        return (
          <section className="donation-section">
            <h2>Donation Information</h2>
            <p style={{fontSize: "1.5rem", color: "red"}}>Commig Soon...</p>            
          </section>
        );
      case "contact":
        return (
          <section className="contact-information">
            <h2>Contact Information</h2>
            <p style={{fontSize: "1.5rem", color: "red"}}>Commig Soon...</p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="inner-app-container">
      <div className="logo-and-arrow">
        <LogoRescueFlow2 />
      </div>

      <h1 className="course-name">{disc?.course?.name}</h1>
      <div className="nav-menu">
        <button
          className={`nav-item ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Course Info
        </button>
        <button
          className={`nav-item ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
        <button
          className={`nav-item ${activeTab === "bulletin" ? "active" : ""}`}
          onClick={() => setActiveTab("bulletin")}
        >
          Bulletin Board
        </button>
        <button
          className={`nav-item ${activeTab === "donation" ? "active" : ""}`}
          onClick={() => setActiveTab("donation")}
        >
          Donation Info
        </button>
        <button
          className={`nav-item ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
      </div>
      <div className="nav-menu-mobile">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
        {isMenuOpen && (
          <div className="mobile-menu-dropdown">
            <button
              className={`mobile-nav-item ${
                activeTab === "info" ? "active" : ""
              }`}
              onClick={() => handleMobileMenuItemClick("info")}
            >
              Course Info
            </button>
            <button
              className={`mobile-nav-item ${
                activeTab === "faq" ? "active" : ""
              }`}
              onClick={() => handleMobileMenuItemClick("faq")}
            >
              FAQ
            </button>
            <button
              className={`mobile-nav-item ${
                activeTab === "bulletin" ? "active" : ""
              }`}
              onClick={() => handleMobileMenuItemClick("bulletin")}
            >
              Bulletin Board
            </button>
            <button
              className={`mobile-nav-item ${
                activeTab === "donation" ? "active" : ""
              }`}
              onClick={() => handleMobileMenuItemClick("donation")}
            >
              Donation Info
            </button>
            <button
              className={`mobile-nav-item ${
                activeTab === "contact" ? "active" : ""
              }`}
              onClick={() => handleMobileMenuItemClick("contact")}
            >
              Contact
            </button>
          </div>
        )}
      </div>
      <div className="tab-content">{renderContent()}</div>

      {courseName && (
        <button onClick={() => navigateToSearch(courseName)}>
          Search Inventory
        </button>
      )}
    </div>
  );
}
