import style from "./ChangePassword.module.scss";

const ChangePassword = () => {
  return (
    <div className={style.changePassword}>
      <form>
        <label>Current password</label>
        <input type="text" placeholder="Your current password" />
        <label>New password</label>
        <input type="text" placeholder="Your new password" />
        <label>Confirm new password</label>
        <input type="text" placeholder="Confirm your new password" />
      </form>
    </div>
  );
};

export default ChangePassword;
