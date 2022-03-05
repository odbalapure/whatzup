import EventsList from "../components/EventsList";
import Urgent from "../components/Urgent";
import Footer from "../components/Footer";
import AnnouncementList from "../components/AnnouncementList";

function Home() {
  return (
    <div>
      <div className="container">
        <Urgent />
        <EventsList />
        <AnnouncementList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
