import Selected from "../../../components/for-you/Selected";
import BookSection from "../../../components/for-you/BookSection";

async function ForYou() {

const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
  fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
  fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
  fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
])

const [selectedData, recommendedData, suggestedData] = await Promise.all([
  selectedRes.json(),
  recommendedRes.json(),
  suggestedRes.json(),
])

const selectedBook = selectedData[0]

  return (
    <div className="wrapper">
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <Selected book={selectedBook} />
            <BookSection title="Recommended For You" subTitle="We think you&apos;ll like these" books={recommendedData} />
            <BookSection title="Suggested Books" subTitle="Browse those books" books={suggestedData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForYou;
