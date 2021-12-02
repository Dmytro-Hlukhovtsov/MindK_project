import { PostHeader } from "./postComponents/postHeader";
import { PostBody } from "./postComponents/postBody";
import { PostFooter } from "./postComponents/postFooter";

export function ShowPost({header, body, footer}){

    return (
        <div className="post">
            <PostHeader logo={header.logo} username={header.username} tag={header.tag} />
            <PostBody text={body.text} timestamp={body.timestamp} />
            <PostFooter retweet={footer.retweet} likes={footer.likes} />
        </div>
        
            
    );
}