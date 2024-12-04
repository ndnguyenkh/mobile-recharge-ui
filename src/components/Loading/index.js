
import { Backdrop } from "@mui/material";
import { PropagateLoader } from "react-spinners";

const override = {
    position: "fixed", // Sử dụng fixed để nó luôn nằm trên cùng
    top: "50%", // Căn giữa theo chiều dọc
    left: "50%", // Căn giữa theo chiều ngang
    transform: "translate(-50%, -50%)", // Điều chỉnh vị trí để căn chính giữa
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    zIndex: "1000",
};

const Loading = ({ loading }) => {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
            // onClick={handleClose}
        >
            <PropagateLoader
                color="#c4c449"
                loading={true}
                cssOverride={override}
                size={20}
            />
        </Backdrop>
    );
};

export default Loading;