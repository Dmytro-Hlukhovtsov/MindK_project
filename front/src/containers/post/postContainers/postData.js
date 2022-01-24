import PostDate from "../../../components/post/postComponents/postData";

export function FormDate({ timestamp }) {
  const month = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const timest = new Date(timestamp);
  const time = timest.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  const date = `${timest.getDay()} ${
    month[timest.getMonth()]
  } ${timest.getFullYear()}`;
  return <PostDate time={time} date={date} />;
}
