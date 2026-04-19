import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const navigate = (page, id = null) => {
    setSelectedCampaignId(id);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} />;

      case "campaign-details":
        return (
          <CampaignDetailsPage
            campaignId={selectedCampaignId}
            navigate={navigate}
          />
        );

      case "create":
        return <CreateCampaignPage navigate={navigate} />;

      case "dashboard":
        return <DashboardPage navigate={navigate} />;

      case "login":
        return <LoginPage navigate={navigate} />;

      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="app-root">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="main-content">{renderPage()}</main>
      </div>
    </AuthProvider>
  );
}