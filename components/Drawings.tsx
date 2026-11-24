import type { FC } from "react";
import SectionLabel from "@/components/SectionLabel";
import DrawingBoard from "@/components/DrawingBoard";
import ReadersWall from "@/components/ReadersWall";

const Drawings: FC = () => (
  <div className="drawings page-fill">
    <SectionLabel folio="p. 04">Drawings.</SectionLabel>
    <div className="drawings-grid">
      <div className="drawings-board-col">
        <h2 className="drawings-title">
          <em>Leave a drawing!</em>
        </h2>
        <DrawingBoard />
      </div>
      <div className="drawings-wall-col">
        <p className="kicker">Past Submissions</p>
        <ReadersWall />
      </div>
    </div>
  </div>
);

export default Drawings;
