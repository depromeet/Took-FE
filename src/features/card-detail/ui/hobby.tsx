interface HobbyProps {
  data: string;
}

function Hobby({ data }: HobbyProps) {
  return (
    <div>
      <p className="text-body-3">{data}</p>
    </div>
  );
}

export default Hobby;
