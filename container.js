
const UserCreatedCase = require("./src/application/use_cases/createUser")

const GenericConsumer = require('./src/infrastructure/RabitMq/consumer');
const UserRepository = require("./src/infrastructure/dataBase/repositories/UserRepositoires")
const PaymentRepository = require("./src/infrastructure/dataBase/repositories/paymentRepository")
const UserUpdateCase = require("./src/application/use_cases/updateUser")
const CreateOrderCase = require("./src/application/use_cases/cretaeOrderCase")
const PaymentVerificationCase = require("./src/application/use_cases/paymentVerificationCase")
const VerifyPremium = require("./src/application/use_cases/verifyPremium")
const RazorpayGateWay = require("./src/infrastructure/razorpay/RazorpayInstance")
const MessageBroker = require("./src/infrastructure/RabitMq/server")
const PaymentRoute = require("./src/presentation/routes/PaymentRoutes")
const PaymentController = require("./src/presentation/controllers/paymentController")
const AuthClient= require("./src/infrastructure/grpc/Authclient")
const AuthService=require("./src/application/services/authService")
const AuthMiddleware=require("./src/presentation/middlewares/verifyToken")



const razorPayGateWay = new RazorpayGateWay()
const messageBroker = new MessageBroker()
const userRepository = new UserRepository()
const paymentRepository = new PaymentRepository()
const authClient  = new AuthClient()
const authService =new AuthService(authClient)
const authMiddleware=new AuthMiddleware(authService)


const userCreatedCase = new UserCreatedCase(userRepository)
const updateUser = new UserUpdateCase(userRepository)
const creatOrderCase = new CreateOrderCase(razorPayGateWay,userRepository,paymentRepository)
const paymentVerificationCase = new PaymentVerificationCase(userRepository,paymentRepository,messageBroker)
const premiumVerifyCase = new VerifyPremium(userRepository)

const paymentController = new PaymentController(creatOrderCase,paymentVerificationCase,premiumVerifyCase)
const paymentRoute =new PaymentRoute(paymentController)



const newUserFormSignup = new GenericConsumer("user_created","service2_queue",userCreatedCase)
const updateUserConsumer = new GenericConsumer("user_updated","payment_userUpdate",updateUser)

module.exports = {
    newUserFormSignup,updateUserConsumer,paymentRoute,authMiddleware
}