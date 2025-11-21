import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BicycleCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  condition: "New" | "Good" | "Used";
  type?: string;
}

const BicycleCard = ({ id, image, title, price, condition, type }: BicycleCardProps) => {
  const conditionColors = {
    New: "bg-accent text-accent-foreground",
    Good: "bg-secondary text-secondary-foreground",
    Used: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border/50">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{title}</h3>
          <Badge className={`${conditionColors[condition]} shrink-0`}>{condition}</Badge>
        </div>
        {type && <p className="text-sm text-muted-foreground">{type}</p>}
        <p className="text-2xl font-bold text-primary">₹{price.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/bicycle/${id}`} className="w-full">
          <Button className="w-full rounded-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BicycleCard;
