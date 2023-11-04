import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestById, updateRequestStatus } from '../../redux/Thunks/requestsThunk';
import { fetchStudent, fetchTutor } from '../../redux/Thunks/userThunk';
import { addNewNotification } from '../../redux/Thunks/notificationsThunk';
import Chat from '../message/Chat';
import { useParams } from 'react-router-dom';
import { FaComments,  FaRegCopy } from 'react-icons/fa';

const RequestDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [recipientId, setRecipientId] = useState('');
  const isStudent = useSelector((state) => state.auth.userRole === 'student');
  const isTutor = useSelector((state) => state.auth.userRole === 'tutor');
  const request = useSelector((state) => state.requests.request);
 
  const tutorID = useSelector((state) => state.requests.request.tutor);
  const studentID = useSelector((state) => state.requests.request.user);

  const studentData = useSelector((state) => state.user.student || []);
  const tutorData = useSelector((state) => state.user.tutor || []);
  const isRequestAccepted = useSelector((state) => state.requests.request.status === 'accepted');
  const isRequestCompleted = useSelector((state) => state.requests.request.status === 'completed');
  const isRequestRejected = useSelector((state) => state.requests.request.status === 'rejected');

  const tutor = useSelector((state) => state.auth.profile._id === tutorID && isTutor  );
  const student = useSelector((state) => state.auth.profile._id === studentID && isStudent );

  const handleAcceptRequest = () => {
    if (tutor) {
      const confirmation = window.confirm('Are you sure you want to accept this request?');
      if (confirmation) {
        dispatch(updateRequestStatus({ requestId: request._id, status: 'accepted' }));
        // Notify the student that their request has been accepted
        dispatch(
          addNewNotification({
            recipientId: request.user,
            message: `Your request "${request.type}" has been accepted by ${tutorData.firstName} ${tutorData.lastName}.`,
            type: 'success',
          })
        );
        window.location.reload(); // Reload the page
      }
    }
  };
  
  const handleRejectRequest = () => {
    if (tutor) {
      const confirmation = window.confirm('Are you sure you want to reject this request?');
      if (confirmation) {
        dispatch(updateRequestStatus({ requestId: request._id, status: 'rejected' }));
        // Notify the student that their request has been rejected
        dispatch(
          addNewNotification({
            recipientId: request.user,
            message: `Your request "${request.type}" has been rejected by ${tutorData.firstName} ${tutorData.lastName}.`,
            type: 'failed',
          })
        );
        window.location.reload(); // Reload the page
      }
    }
  };
  
  const handleCompleteRequest = () => {
    if (tutor) {
      const confirmation = window.confirm('Are you sure you want to complete this request?');
      if (confirmation) {
        // Ensure a recipientId is set before completing the request
          dispatch(updateRequestStatus({ requestId: request._id, status: 'completed' }));
        dispatch(
          addNewNotification({
            recipientId: request.user,
            message: `Your request "${request.type}" has been completed by ${tutorData.firstName} ${tutorData.lastName}.`,
            type: 'success',
          })
        );
        window.location.reload(); 
              
      }
    }
  };
  
  
  const handleShowChat = () => {
    setShowChat(true);
  };

  useEffect(() => {
    dispatch(fetchRequestById(id));
    dispatch(fetchStudent(studentID));
    dispatch(fetchTutor(tutorID));
  }, [dispatch, id, studentID, tutorID]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-8xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold mb-10">Request Details</h3>
            {tutor && !isRequestCompleted && !isRequestRejected && !isRequestAccepted &&(
            <div className="space-x-5">
              <button
                onClick={handleAcceptRequest}
                className="bg-green-500 hover:bg-green-600 transition duration-300 text-white px-4 py-2 rounded-full"
              >
                Accept
              </button>
              <button
                onClick={handleRejectRequest}
                className="bg-red-500 hover:bg-red-600 transition duration-300 text-white px-4 py-2 rounded-full ml-2"
              >
                Reject
              </button>
            </div>
          )}
        </div>


          {tutor && isRequestRejected  &&(
            <div className="border rounded-lg border-red-500 shadow-md p-4 mt-4">
            <p className="text-gray-600 text-lg mb-4">
              <span className="text-red-500 font-semibold">Request Rejected:</span>
            </p>
            <p className="text-gray-600">
              You have chosen to reject the student's request. Here's what you can do next:
            </p>
            <ul className="list-disc pl-5">
              <li className="text-gray-600 mb-2">
                <strong>Effective Communication:</strong> If the rejection was due to scheduling or other issues, consider communicating with the student to explain the situation.
              </li>
              <li className="text-gray-600 mb-2">
                <strong>Stay Available:</strong> Even if you reject a request, continue to make yourself available for other potential requests.
              </li>
              <li className="text-gray-600 mb-2">
                <strong>Feedback:</strong> Providing constructive feedback can help students improve their requests in the future.
              </li>
              <li className="text-gray-600 mb-2">
                <strong>Delete Request:</strong> After rejecting the request, you may want to delete it from your request list.
                </li>

            </ul>
          </div>
          
            )}

            {student && isRequestRejected  &&(
                <div className="border rounded-lg border-red-500 shadow-md p-4 mt-4">
                <p className="text-gray-600 text-lg mb-4">
                  <span className="text-red-500 font-semibold">Request Rejected:</span>
                </p>
                <p className="text-gray-600">
                  We regret to inform you that your request has been rejected by the tutor. Here's what you can do next:
                </p>
                <ul className="list-disc pl-5">
                  <li className="text-gray-600 mb-2">
                    <strong>Message for Feedback:</strong> If you would like to understand the reason for the rejection or seek feedback, don't hesitate to message the tutor.
                  </li>
                  <li className="text-gray-600 mb-2">
                    <strong>Consider Other Tutors:</strong> Explore other available tutors who may be able to assist you with your request.
                  </li>
                  <li className="text-gray-600 mb-2">
                    <strong>Modify Your Request:</strong> If needed, you can adjust your request details to increase the likelihood of finding a suitable tutor.
                  </li>
                  <li className="text-gray-600 mb-2">
                    <strong>Delete Request:</strong> After request is rejected , you may want to delete it from your request list.
                    </li>

                </ul>
              </div>
              
            )}
            {!isRequestRejected &&(

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <div className="mb-6 border rounded-lg border-indigo-500 shadow-lg p-4">
                <h4 className="text-xl font-semibold mb-2">Request Information</h4>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Tutor Name:</span>{' '}
                  {tutorData.firstName || 'unknown'} {tutorData.lastName || 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold ">Type:</span> {request.type || 'unknown'}
                </p>
                <p className="flex text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold mr-1  ">Message:</span>{' '}
                  {request.message ? (
                    <span dangerouslySetInnerHTML={{ __html: request.message }} />
                  ) : (
                    'unknown'
                  )}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold ">Urgency:</span> {request.urgency || 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Duration:</span> {request.duration || 'unknown'} hours
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Location:</span> {request.location || 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Date and Time:</span>{' '}
                  {request.dateTime ? new Date(request.dateTime).toLocaleString() : 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Requirements:</span> {request.requirements ? request.requirements : 'unknown'}
                  
                </p>
              </div>

              <div>
              <div className="mb-6 w-full border rounded-lg border-indigo-500 shadow-lg p-4">
                <h4 className="text-xl font-semibold mb-2">Requestor Information</h4>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Name:</span>{' '}
                  {studentData.firstName || 'unknown'} {studentData.lastName || 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Email:</span> {studentData.email || 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Phone:</span> {studentData.phone || 'unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="text-indigo-500 font-semibold">Location:</span> {studentData.location || 'unknown'}
                </p>
              </div>

            </div>
            {tutor && isRequestAccepted && !isRequestCompleted && (
                <div className='border rounded-lg border-yellow-500 shadow-md p-4 justify-center'> 
                      <p className=" text-gray-600  mb-4">
                   Click complete to notify Requestee, if the task has been completed.
                </p>
                 <button
                 onClick={handleCompleteRequest}
                 className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white px-4 py-2 rounded-full "
               >
                 Complete
               </button>
                </div>
            )}
              </div>

              
            {isRequestCompleted && (
              <div className="border rounded-lg border-green-500 shadow-md p-4">
                {student && (
                  <div>
                    <p className="text-gray-600 text-lg mb-4">
                      <span className="text-green-500 font-semibold">Request Completed:</span>
                    </p>
                    <p className="text-gray-600">
                      Your request has been completed. Here's what you can do next as a student:
                    </p>
                    <ul className="list-disc pl-5">
                      <li className="text-gray-600 mb-2">
                        <strong>Feedback:</strong> Provide feedback on the completed request to help improve the platform.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Review:</strong> Consider leaving a review for the tutor.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Refer Friends:</strong> If you had a great experience, don't forget to refer your friends to the platform and earn rewards.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Explore More:</strong> Browse other available tutors and request help for your future needs.
                      </li>
                      {/* Add any other relevant instructions for students */}
                    </ul>
                  </div>
                )}

              

                {tutor && isRequestCompleted &&(
                  <div>
                    <p className="text-gray-600 text-lg mb-4">
                      <span className="text-green-500 font-semibold">Request Completed:</span>
                    </p>
                    <p className="text-gray-600">
                      You have successfully completed this request. Here's what you can do next as a tutor:
                    </p>
                    <ul className="list-disc pl-5">
                      <li className="text-gray-600 mb-2">
                        <strong>Feedback:</strong> Provide feedback on the completed request to help improve the platform.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Enhance Profile:</strong> Update your profile with additional qualifications and information to attract more students.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Availability:</strong> Make sure your availability status is up to date to receive more requests.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Marketing:</strong> Consider sharing your tutoring services on social media or other platforms to reach a broader audience.
                      </li>
                      {/* Add any other relevant instructions for tutors */}
                    </ul>
                  </div>
                )}
                
              </div>
              
            )}
            

              {student && !isRequestAccepted && !isRequestCompleted && !isRequestRejected &&(

                <div className="border rounded-lg border-indigo-500 shadow-md p-4 ">
                    <p className="text-gray-600 text-lg mb-4">
                        <span className="text-indigo-500 font-semibold">Awaiting Tutor's Response:</span>
                    </p>
                    <p className="text-gray-600">
                        As you await the tutor's response, here are some tips to help you make an informed decision:
                    </p>
                    <ul className="list-disc pl-5">
                        <li className="text-gray-600 mb-2">
                        <strong>Review Tutor Profiles:</strong> Take a closer look at the tutor's profile, qualifications, and reviews.
                        </li>
                        <li className="text-gray-600 mb-2">
                        <strong>Consider Availability:</strong> Ensure the tutor's availability aligns with your preferred schedule.
                        </li>
                        <li className="text-gray-600 mb-2">
                        <strong>Message Clarifications:</strong> Feel free to message the tutor for clarifications or additional information.
                        </li>
                        <li className="text-gray-600 mb-2">
                        <strong>Compare Offers:</strong> If you receive multiple offers, compare them to choose the best fit for your needs.
                        </li>
                        <li className="text-gray-600 mb-2">
                        <strong>Patience is Key:</strong> Tutors may take some time to respond, so be patient and give them time to consider your request.
                        </li>
                        <li className="text-gray-600 mb-2">
                        <strong>Check Notifications:</strong> Keep an eye on your notifications for updates on tutor responses.
                        </li>
                    </ul>
                    </div>
                )}
                 {tutor && !isRequestAccepted && !isRequestCompleted && !isRequestRejected &&(
                    <div className="border rounded-lg border-indigo-500 shadow-md p-4">
                    <p className="text-gray-600 text-lg mb-4">
                      <span className="text-indigo-500 font-semibold">Pending Request:</span>
                    </p>
                    <p className="text-gray-600">
                      Your decision on this request is important. Here are some tips while you consider the request:
                    </p>
                    <ul className="list-disc pl-5">
                      <li className="text-gray-600 mb-2">
                        <strong>Review Request Details:</strong> Take a moment to thoroughly review the request details, including type, urgency, and requirements.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Assess Your Availability:</strong> Ensure you can commit to the requested date, time, and location.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Message for Clarifications:</strong> If you have questions or need more information, don't hesitate to message the student.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Confirm or Reject Promptly:</strong> Once you've made a decision, confirm or reject the request promptly to keep the student informed.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Manage Your Schedule:</strong> Consider your schedule and workload before accepting additional requests.
                      </li>
                      <li className="text-gray-600 mb-2">
                        <strong>Effective Communication:</strong> Clear communication with the student is key to a successful tutoring session.
                      </li>
                    </ul>
                  </div>                  
                    )}
            {(tutor || student) && isRequestAccepted && (
                
               <div className="border rounded-lg border-indigo-500 shadow-md p-4 ">
                 <div className="mt-4">
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="text-indigo-500 font-semibold">Recipient ID for Payment:</span>
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        readOnly
                        value={tutorData.walletId}
                        className="border p-2 rounded w-full"
                      />
                     <button
                        onClick={() => {
                            navigator.clipboard.writeText(tutorData.walletId);
                            alert('Recipient ID copied to clipboard');
                        }}
                        className=" text-white flex items-center "
                        >
                        <FaRegCopy className='text-xl text-gray-500 hover:text-gray-600 transition duration-300'/> 
                        </button>
                    </div>
                  </div>
                  <div className=''> 
                        <p className="mt-10 text-gray-600 text-lg mb-4">
                        <span className="text-indigo-500 font-semibold">Start Communication:</span> Click the icon below to open the chat box.
                    </p>
                    <button
                        onClick={handleShowChat}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition duration-300"
                    >
                        <FaComments className='text-2xl' />
                        <span className="">Open Chat</span>
                    </button> 
               </div>
               <div className="border rounded-lg border-purple-500 shadow-md p-4 mt-8">
                <p className="text-gray-600 text-lg mb-4">
                    <span className="text-indigo-500 font-semibold">Effective Communication Tips:</span>
                </p>
                <ul className="list-disc pl-5">
                    <li className="text-gray-600 mb-2">
                    <strong>Be Clear and Concise:</strong> Clearly express your thoughts and expectations to avoid misunderstandings.
                    </li>
                    <li className="text-gray-600 mb-2">
                    <strong>Ask Questions:</strong> Don't hesitate to ask questions to ensure you fully understand each other's needs.
                    </li>
                    <li className="text-gray-600 mb-2">
                    <strong>Use Chat Responsibly:</strong> Avoid sharing personal information like phone numbers or addresses in chat.
                    </li>
                    <li className="text-gray-600 mb-2">
                    <strong>Report Concerns:</strong> If you encounter any issues or concerns, report them to us immediately for assistance.
                    </li>
                </ul>
                </div>
             </div>
              )}
          </div>
          )}
        </div>
      </div>

      {showChat && <Chat request={request} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default RequestDetails;
