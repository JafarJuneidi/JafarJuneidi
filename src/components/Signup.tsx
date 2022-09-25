import React from 'react'

const form = {
  id: 3644704,
  title: 'Subscribe to the Newsletter',
  subTitle: 'Subscribe to get my latest content by email.',
  buttonText: 'Subscribe'
}
export default function Signup() {
  return (
    <form
      action={`https://app.convertkit.com/forms/${form.id}/subscriptions`}
      className='seva-form formkit-form mt-6 rounded-md shadow shadow-gray-300 bg-gray-50 dark:bg-zinc-800 dark:shadow-gray-800'
      method='post'
      data-sv-form='3644704'
      data-uid='92f8ea0121'
      data-format='inline'
      data-version='5'
      min-width='400 500 600 700 800'
    // style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '6px', boxShadow: dark }}
    >
      <div data-style='full'>
        <div data-element='column' className='formkit-column'>
          <div className='formkit-background' style={{ opacity: '0.3' }}></div>
          <div
            className='formkit-header'
            data-element='header'
            style={{
              color: 'rbb(77, 77, 77)',
              fontSize: '25px',
              fontWeight: 700
            }}
          >
            <h2>{form.title}</h2>
          </div>
          <div
            className='formkit-subheader dark:text-gray-300'
            data-element='subheader'
          // style={{ color: 'rgb(104, 104, 104)', fontSize: '15px' }}
          >
            <p>{form.subTitle}</p>
          </div>
          <div
            className='formkit-image formkit-image relative focus:outline-none cursor-default'
            role='button'
          >
            <img
              className='focus:outline-blue'
              src='https://embed.filekitcdn.com/e/8z8RseeFJ6cFGgheuTWKHN/rCC6cTJVbiDvbHM1MFZm6Z'
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>

        <div data-element='column' className='formkit-column'>
          <ul
            className='formkit-alert formkit-alert-error'
            data-element='errors'
            data-group='alert'
          ></ul>
          <div data-element='fields' className='seva-fields formkit-fields'>
            <div className='formkit-field'>
              <input
                className='formkit-input'
                aria-label='First Name'
                name='fields[first_name]'
                required={true}
                placeholder='First Name'
                type='text'
                style={{
                  color: 'rgb(0, 0, 0)',
                  borderColor: 'rgb(227, 227, 227)',
                  borderRadius: '4px',
                  fontWeight: 400
                }}
              />
            </div>
            <div className='formkit-field'>
              <input
                className='formkit-input'
                name='email_address'
                aria-label='Email Address'
                placeholder='Email Address'
                required={true}
                type='email'
                style={{
                  color: 'rgb(0, 0, 0)',
                  borderColor: 'rgb(227, 227, 227)',
                  borderRadius: '4px',
                  fontWeight: 400
                }}
              />
            </div>
            <button
              data-element='submit'
              className='formkit-submit formkit-submit bg-blue-500 hover:bg-blue-600 transition-colors duration-150'
              style={{
                borderRadius: '24px'
              }}
            >
              <div className='formkit-spinner'>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className=''>{form.buttonText}</span>
            </button>
          </div>
          <div
            className='formkit-guarantee text-sm dark:text-gray-300'
            data-element='guarantee'
          >
            <p>I won't spam you.</p>
            <p>
              Unsubscribe at <strong>any </strong>time.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
