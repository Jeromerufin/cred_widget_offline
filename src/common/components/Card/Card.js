import classNames from "classnames";

export const Card = ({
  children,
  highLightColorClassName,
  childWrapperClass,
  borderColor,
  glow,
  darker,
  ...props
}) => {
  return (
    <>
      <div
        {...props}
        className={classNames(
          "rounded-xl border-2",
          borderColor || "border-cred-light-blue-opacity-0.2",
          darker ? "bg-dark-blue" : "bg-cred-blue",
          props.className
        )}
        style={{
          boxShadow: glow
            ? "0px 8px 64px -24px rgba(93, 120, 255, 0.8)"
            : undefined,
          ...props.style,
        }}
      >
        {highLightColorClassName && (
          <div
            className={classNames(highLightColorClassName, "h-2  rounded-t-lg")}
          />
        )}
        <div
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;
