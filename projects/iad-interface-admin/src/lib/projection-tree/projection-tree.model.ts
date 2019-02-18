export class ProjectionTreeModel {
  code: string;
  label: string;
  url: string;
}
export class PresentationTreeModel {
  code: string; // Presentation code
  label: string; // Presentation label
  projections: ProjectionTreeModel[];
}
