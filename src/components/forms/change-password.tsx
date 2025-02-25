"use client";
import React, { useActionState, useState } from "react";
import { inputClasses } from "./register-form";
import { changePassword } from "@/lib/actions/change-password-action";

const ChangePassword = () => {
  const [show, setShow] = useState<boolean>(false);

  //handle password change action
  const [state,formAction,isPending] = useActionState(changePassword,"")
  const handleShowForm = () => {
    setShow((prev) => !prev);
  };

  const buttonClass = `px-4 py-2 mx-auto rounded border-2 ${
    show ? "bg-red-500/20  border-red-600" : "bg-blue-500/20  border-blue-600"
  } `;

  return (
    <div className="px-[20px] pb-[70px] flex flex-col">
      <button onClick={handleShowForm} className={buttonClass}>
        {show ? "Cancel" : "Change password"}
      </button>

      {show && (
        <form action={formAction} className="flex flex-col gap-[20px] pt-[20px]">
          <p className="font-semibold text-[20px]">Change Password</p>
          <input
            className={inputClasses}
            name="password"
            placeholder="Current Password"
          />
          <input
            className={inputClasses}
            name="newpassword"
            placeholder="New Password"
          />

          {state && <p className={state === "Password changed successfully" ? "text-green-500" : `text-red-500`}>{state}</p>}

          <button disabled={isPending} className="p-2 rounded-lg bg-blue-500">
            {isPending ? "Changing password..." : "Confirm New Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
