export default function LoadMore({toggleShowMore, showMore}){
  return (
    <>
      <section className="morebar" aria-label="Load more">
        <button
          className="morebar__btn"
          type="button"
          style={{ minWidth: "180px", letterSpacing: "0.4px" }}
          onClick={() => toggleShowMore()}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </section>
    </>
  );
}