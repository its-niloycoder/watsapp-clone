import Navbar from "../components/Navbar/Navbar";
import "./Social.css"
function Social() {
    return (
        <>
            <Navbar />
            <br />

            {/* <img src="your.svg"/>
            <object data="your.svg"/>
            <iframe src="your.svg"/>
            <embed src="your.svg"/> */}
            <div className="center-image">
                <span >My Site: </span>
                <a href="https://niloycoder.vercel.app/" target="_blank" className="center-image">
                    <img src="/assets/web.svg" alt="WebSite"/>
                </a>
            </div>
            <a href="https://www.youtube.com/@niloy-the-coder" target="_blank" className="center-image">
                <img src="/assets/youtube.svg" alt="Youtube"/>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100077036263259" target="_blank" className="center-image">
                <img src="/assets/facebook.svg" alt="Facebook"/>
            </a>


        </>
    );
}

export default Social;
