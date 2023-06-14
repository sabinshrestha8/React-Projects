interface Props {
    children: string;
    color?: string; // If we add `?` after property name then it represents that the property is optional.
    onClick: () => void;
}

/*
 * Assigning color prop the default value of primary & with that
 * if we don't pass value for color prop it will take primary as
 * default value but if the property isn't made optional then we
 * 've to still pass the property with value as empty string ("")
 * or so to make this work.
 */
const Button = ({ children, color='primary', onClick }: Props) => {
  return (
    <button className={'btn btn-' + color} onClick={onClick}>{children}</button>
  );
}

export default Button;
