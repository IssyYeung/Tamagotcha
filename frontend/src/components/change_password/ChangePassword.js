import style from "./ChangePassword.module.scss";
import Button from "../button/Button";

const ChangePassword = () => {
  return (
    <div className={style.changePassword}>
      <form>
        <label>Current password</label>
        <input type="password" placeholder="Your current password" />
        <label>New password</label>
        <input type="password" placeholder="Your new password" />
        <label>Confirm new password</label>
        <input type="password" placeholder="Confirm your new password" />
        <Button
          type="submit"
          className={style.submitPassword}
          component="input"
          value="Confirm New Password"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
