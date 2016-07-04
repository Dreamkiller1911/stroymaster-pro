<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	public $email;
	private $_id;

	/**
	 * Authenticates a user.
	 * @return boolean whether authentication succeeds.
	 */
	public function __construct($email,$password)
	{
		$this->email=$email;
		$this->password=$password;
	}
	public function authenticate()
	{

		$user = User::model()->find('LOWER(email)=?',array(strtolower($this->email))) != null
				? User::model()->find('LOWER(email)=?',array(strtolower($this->email)))
				: User::model()->find('LOWER(phone)=?',array(strtolower($this->email)));
		if($user===null){

			$this->errorCode=self::ERROR_USERNAME_INVALID;
		}
		else if(!$user->validatePassword($this->password)) {
			$this->errorCode = self::ERROR_PASSWORD_INVALID;
		}
		else
		{

			$this->setState('class', $user->class);
			$this->setState('phone', $user->phone);
			$this->_id=$user->id;
			$this->email=$user->email;
			$this->errorCode=self::ERROR_NONE;
		}
		return $this->errorCode==self::ERROR_NONE;
	}

	/**
	 * @return integer the ID of the user record
	 */
	public function getId()
	{
		return $this->_id;
	}
}