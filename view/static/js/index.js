document.addEventListener("DOMContentLoaded", function () {
  const connectButton = document.getElementById("connectButton");

  if (connectButton) {
    connectButton.addEventListener("click", async function connectWallet() {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          fetch("/user/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress: accounts[0] }),
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          window.location.reload();
        } catch (err) {
          console.error(err.message);
        }
      } else {
        window.location.href =
          "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
      }
    });
  }

  const addFriendButton = document.getElementById("addFriendButton");
  if (addFriendButton) {
    addFriendButton.addEventListener("click", function () {
      const userId = this.dataset.userId;
      const friendId = this.dataset.friendId;

      fetch("/user/profile/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, friendId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  //   document.querySelectorAll(".acceptRequest").forEach((button) => {
  //     button.addEventListener("click", function () {
  //       const requestId = this.dataset.requestId;
  //       fetch("/user/friends/accept", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           userId: this.dataset.userId,
  //           requestId: requestId,
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data.message);
  //           location.reload();
  //         })
  //         .catch((error) => console.error("Error:", error));
  //     });
  //   });

  //   document.querySelectorAll(".declineRequest").forEach((button) => {
  //     button.addEventListener("click", function () {
  //       const requestId = this.dataset.requestId;
  //       fetch("/user/friends/decline", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           userId: this.dataset.userId,
  //           requestId: requestId,
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data.message);
  //           location.reload();
  //         })
  //         .catch((error) => console.error("Error:", error));
  //     });
  //   });

  document
    .querySelectorAll(".acceptRequest, .declineRequest")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const action = this.classList.contains("acceptRequest")
          ? "accept"
          : "decline";
        const requestId = this.dataset.requestId;
        fetch(`/user/friends/${action}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: this.dataset.userId,
            requestId: requestId,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.message);
            window.location.reload();
          })
          .catch((error) => console.error("Error:", error));
      });
    });
});
