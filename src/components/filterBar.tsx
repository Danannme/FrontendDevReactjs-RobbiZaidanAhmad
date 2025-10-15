import { Separator } from "@/components/ui/separator";

function filterBar() {
  return (
    // filterbar container
    <div>
      <Separator /> {/* horizontal line */}
      <div>
        <span>Filter By:</span>
        <div>
          <input type="radio" value="open-now" id="open-now" />
          <label htmlFor="open-now">Open Now</label>
        </div>
      </div>
      <Separator /> {/* horizontal line */}
    </div>
  );
}
