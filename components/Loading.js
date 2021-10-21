import { Pulse } from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height:"100hv" }}>
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
                    alt=""
                    style={{marginBottom: 10}}
                    height={200}
                />
            <Pulse color="#53D060" duration="0.8s" size={120} />
            </div>
        </center>
    )
}

export default Loading
