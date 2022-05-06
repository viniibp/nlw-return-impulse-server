import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,9weryqw98fgiasgfasifwe'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should be not able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,9weryqw98fgiasgfasifwe'
    })).rejects.toThrow();
  })

  it('should be not able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: '',
      screenshot: 'data:image/png;base64,9weryqw98fgiasgfasifwe'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'teste.jpg'
    })).rejects.toThrow();
  })
})