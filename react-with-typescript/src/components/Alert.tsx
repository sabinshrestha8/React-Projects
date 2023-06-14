import { ReactNode } from "react";

interface Props {
  /* 
   * There is a special prop that all components support i.e. children.
   * If we simply rename text to children now we can pass our text, html
   * content as a child to this component.
   */
  // text: string;
  children: ReactNode; // This is the ReactNode class defined in the react module & with that we can pass HTML Content to `Alert` component. 
}

const Alert = ({ children }: Props) => {
  return (
    <div className="alert alert-primary">{children}</div>
  );
}

export default Alert;
