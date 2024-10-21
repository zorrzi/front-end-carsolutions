import Header from "../../components/Header";
import FundoLoginCliente from "../../components/FundoLoginCliente";
import Footer from "../../components/Footer";
import SignupCliente from "../../components/SignupCliente";



function signupCliente() {
    return (
      <>
        <Header />
        <div className="image-container">
          <FundoLoginCliente />
          <SignupCliente />
          
        </div>

        <div className="espaco">
            <Footer />
      </div>
      

        
      
      </>
      
  
    );
  }
  
  export default signupCliente;