//wajp to create class employee id,name,salary take input from user and create 
//three objects of this class using parametrized cons

import java.util.Employe;
class Employe{
	int id;
	String name;
	int salary;
	Employe(int id,String name,int salary){
		this.id=id;
		this.name=name;
		this.salary=salary;
		
	}
}

//if u have a next line after nextInt,nextFloat .... u will need a extra nextline b/w them
class EmployeDemo{
	public void readInput(){
		Scanner sc=new Scanner(System.in);
		this.id=sc.nextInt();
		sc.nextInt();
		//used to flush extra enter
		System.out.println("enter name");
		this.name=sc.nextLine();
		
		System.out.println("enter salary");
		this.salary=sc.nextInt();	
	}
	public void display(){
		System.out.println(this.id+"-"+this.name+"-"+this.salary);
	}
}
class EmployeDemo{
	public static void main(String[] args){
		Employe e1=new Employe();
		e1.readInput();
		System.out.println(e1);
		
		Employe e2=new Employe();
		e2.readInput();
		System.out.println();
		
		Employe e3=new Employe();
		e3.readInput();
		System.out.println();
	}
}



