import AudioPlayerBar from "../../../../components/player/AudioPlayerBar"
import PlayerSummary from "../../../../components/player/PlayerSummary"



async function PlayerPage({ params }) {
    const { id } = await params
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
    const book = await res.json()
    
  return ( 
    <div id="summary">
        <div className="summary">

            <div className="audio__book--summary">
                <div className="audio__book--summary-title">
                    <b>{book.title}</b>
                    </div>
                <PlayerSummary summary={book.summary} />
            </div>

            <AudioPlayerBar book={book}/>

        </div>
    </div>
  )
}

export default PlayerPage