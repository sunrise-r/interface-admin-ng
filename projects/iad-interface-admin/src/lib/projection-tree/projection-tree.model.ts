export class ProjectionTreeModel {
  code: string;
  label: string;
  routerLink: string[];
}
export class PresentationTreeModel {
  code: string; // Presentation code
  label: string; // Presentation label
  projections: ProjectionTreeModel[];
}
