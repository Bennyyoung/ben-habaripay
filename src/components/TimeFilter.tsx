import { Button } from './ui/button';

const timeFilters = ['7 Days', '14 Days', '1 Month'];

export function TimeFilter() {
  return (
    <div className="flex items-center gap-2">
      {timeFilters.map((filter, index) => (
        <Button
          key={filter}
          variant={index === 0 ? "default" : "outline"}
          size="sm"
          className={index === 0 ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}