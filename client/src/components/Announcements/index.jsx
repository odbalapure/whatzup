import useAsync from "../../hooks/useAsync";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementPlaceholder from "./AnnouncementPlaceholder";
import ErrorCard from "../ErrorCard";

function AnnouncementList() {
  const { data, error } = useAsync("announcements", "GET", null, false);

  if (error?.status >= 500 || error?.error) {
    return <ErrorCard msg="Failed to fetch annoucements!" />;
  }

  return (
    <div className="mt-5 mb-5 container">
      <div className="fs-4">General Announcements</div>
      <hr />
      <div
        className="d-flex"
        style={{
          overflow: "auto"
        }}
      >
        {data?.announcements ? (
          data?.announcements &&
          data?.announcements.map((announcement) => (
            <AnnouncementCard announcement={announcement} />
          ))
        ) : (
          <AnnouncementPlaceholder />
        )}
      </div>
    </div>
  );
}

export default AnnouncementList;
