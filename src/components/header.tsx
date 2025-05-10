type Props = { text: string };

const Header = ({ text }: Props) => {
  return (
    <h1 className="text-jet dark:text-lavenderblush font-bold text-4xl">
      {text}
    </h1>
  );
};

export default Header;
