export default function Loading() {
  return (
    <div id="summary">
      <div className="summary">
        <div className="player-loading">
          <div className="player-spinner"></div>
        </div>

        <div className="audio__wrapper">
          <div className="audio__track--wrapper">
            <figure className="audio__track--img-mask">
              <div className="audio__book--img-skeleton skeleton"></div>
            </figure>

            <div className="audio__track--details-wrapper">
              <div className="audio__track--title-skeleton skeleton"></div>
              <div className="audio__track--author-skeleton skeleton"></div>
            </div>
          </div>

          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <div className="audio__controls--btn-skeleton small skeleton"></div>
              <div className="audio__controls--btn-skeleton play skeleton"></div>
              <div className="audio__controls--btn-skeleton small skeleton"></div>
            </div>
          </div>

          <div className="audio__progress--wrapper">
            <div className="audio__time-skeleton skeleton"></div>
            <div className="audio__progress--bar-skeleton skeleton"></div>
            <div className="audio__time-skeleton skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}