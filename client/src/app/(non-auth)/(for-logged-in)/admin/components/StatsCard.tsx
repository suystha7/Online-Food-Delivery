type StatsCardProps = {
    title: string;
    value: string;
  };
  
  export default function StatsCard({ title, value }: StatsCardProps) {
    return (
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  }
  