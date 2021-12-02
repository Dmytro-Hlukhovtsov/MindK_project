import {PostDate} from "../../../components/post/postComponents/postData";

export function FormDate({timestamp}){
    const month = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
    const time = timestamp.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
    const date = timestamp.getDay() + ' ' + month[timestamp.getMonth()] + ' ' + timestamp.getFullYear();
    return <PostDate time={time} date={date} />
}