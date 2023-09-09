import Events from "../components/Events";
import Urgent from "../components/Urgent";
import Footer from "../components/Footer";
import Announcements from "../components/Announcements";

function Home() {
  return (
    <div>
      <div className="container">
        <Urgent />
        <Events />
        <Announcements />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
