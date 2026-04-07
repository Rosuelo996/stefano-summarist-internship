"use client";

import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { openModal } from "../../../redux/modalSlice";

function Settings() {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function getSubscription() {
      const ref = collection(db, "customers", user.uid, "subscriptions");
      const snapshot = await getDocs(ref);

      snapshot.forEach((doc) => {
        setSubscription(doc.data());
      });
    }

    getSubscription();
  }, [user]);

  console.log(subscription);

  let planName = "Basic";

  if (
    subscription &&
    (subscription.status === "active" || subscription.status === "trialing")
  ) {
    const planId = subscription.items[0].plan.id;

    if (planId === "price_1TJKZCH4YwsQgJ87wCwodNvv") {
      planName = "Premium Plus";
    } else if (planId === "price_1TIy9SH4YwsQgJ87cCW9plV9") {
      planName = "Premium";
    }
  }

  return (
    <div id="settings">
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Settings</div>
          {!user ? (
            <div className="settings__login--wrapper">
              <img src="/login.png" alt="" />
            <div className="settings__login--text">Log in to your account to see your details</div>
            <button 
            className="btn settings__login--btn"
            onClick={() => dispatch(openModal())}>Login</button>
            </div>
            ) : (
          <>
          <div className="settings__content">
            <div className="settings__subtitle">Your Subscription Plan</div>
            <div className="settings__text">{planName}</div>
            {planName === "Basic" && (
              <a href="/choose-plan" className="btn settings__upgrade--btn">
                Upgrade to Premium
              </a>
            )}
          </div>
          <div className="settings__content">
            <div className="settings__subtitle">Email</div>
            <div className="settings__text">{user?.email}</div>
          </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
