import Header from "../../components/Header";
import FundoLogin from "../../components/FundoLogin";
import Footer from "../../components/Footer";
import SignupCliente from "../../components/SignupCliente";



function userSignup() {
    return (
      <>
        <Header />
        <div className="image-container">
          <FundoLogin />
          <SignupCliente />
          
        </div>

        <div className="espaco">
            <Footer />
      </div>
      

        
      
      </>
      
  
    );
  }
  
  export default userSignup;