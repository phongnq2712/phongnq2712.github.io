<template>
	<div class="notes-all">
		<h2>📝 Tech Notes</h2>

		<!-- Tabs -->
		<div class="tabs">
			<button
			v-for="tab in tabs"
			:key="tab"
			:class="{ active: activeTab === tab }"
			@click="activeTab = tab"
			>
			{{ tab }}
		</button>
	</div>

	<!-- Notes Content -->
	<div class="tab-content">
		<div v-if="activeTab === 'Java'">
			<h3>☕ Java Notes</h3>
			<ul>
				<li>
					<h4 @click="toggleCollapse('solid')" class="collapsible-header">
						<span>{{ isCollapsed?.solid ? '➕' : '➖' }}</span>
						SOLID Design Principles 🚀
					</h4>
					<div v-show="!isCollapsed.solid" class="collapsible-content">
						<p class="sub-content">SOLID is a set of five design principles that help developers write maintainable, scalable, and flexible object-oriented software. These principles were introduced by Robert C. Martin (Uncle Bob).
							<br/> 
							<br/>
							<span class="tit-1">1. Single Responsibility Principle (SRP)</span>
							<span class="tit-2">A class should have only one reason to change.
							Each class should have only one job or responsibility.</span>
							<br/>
							✅ Example (Following SRP):
							<pre class="code-style">// Class responsible only for user data
class User {
	private String name;
	private String email;

	public User(String name, String email) {
		this.name = name;
		this.email = email;
	}

	public String getEmail() { return email; }
}

// Class responsible only for sending emails
class EmailService {
	public void sendEmail(String email, String message) {
		System.out.println("Sending email to: " + email);
	}
}

// Usage:
User user = new User("Alice", "alice@example.com");
EmailService emailService = new EmailService();
emailService.sendEmail(user.getEmail(), "Welcome to SOLID principles!");

❌ Bad Example: If we put both user management and email sending inside one class, it violates SRP.
🔹 Why? If email logic changes, the User class will also need modification, which is not its responsibility.
							</pre>

							<span class="tit-1">2. Open/Closed Principle (OCP)</span>
							<span class="tit-2">Software entities (classes, methods) should be open for extension but closed for modification.
								Meaning: Extend behavior without modifying existing code.
								<br/>
								✅ Example (Following OCP):
							</span>

							<pre class="code-style">
// Base class (Closed for modification)
abstract class Shape {
	abstract double calculateArea();
}

// Extended classes (Open for extension)
class Circle extends Shape {
	private double radius;
	public Circle(double radius) { this.radius = radius; }
	public double calculateArea() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
	private double width, height;
	public Rectangle(double width, double height) {
		this.width = width; this.height = height;
	}
	public double calculateArea() { return width * height; }
}

// Usage:
Shape circle = new Circle(5);
Shape rectangle = new Rectangle(4, 6);

System.out.println(circle.calculateArea());  // No need to modify existing code
System.out.println(rectangle.calculateArea());
❌ Bad Example: If we modify an existing Shape class every time a new shape is added, it violates OCP.
🔹 Why? Extending functionality through inheritance allows adding new shapes without modifying existing classes.
							</pre>

							<span class="tit-1">3. Liskov Substitution Principle (LSP)</span>
							<span class="tit-2">A subclass should be able to replace its superclass without affecting the program’s correctness.
								Meaning: Child classes should not break parent class behavior.
								<br/>
								✅ Example (Following LSP):
							</span>

							<pre class="code-style">
class Bird {
	public void fly() { System.out.println("Flying..."); }
}

class Sparrow extends Bird {} // Sparrow can fly, no issue

// Wrong subclass violating LSP
class Penguin extends Bird {
	public void fly() { throw new UnsupportedOperationException("Penguins can't fly!"); }
}

// Usage:
Bird sparrow = new Sparrow();
sparrow.fly(); // Works fine

Bird penguin = new Penguin();
penguin.fly(); // Breaks LSP (throws exception!)
❌ Bad Example: The Penguin class violates LSP because it breaks the expected behavior of a Bird, which should be able to fly.
🔹 Why? A subclass must behave like its parent class without introducing unexpected behavior.
✔ Fix: Instead of making Bird assume all birds fly, we can introduce a CanFly interface.

interface CanFly {
	void fly();
}

class Sparrow implements CanFly {
	public void fly() { System.out.println("Sparrow flying"); }
}

class Penguin {} // No flying capability
Now, Penguin is not forced to implement fly().
							</pre>

							<span class="tit-1">4. Interface Segregation Principle (ISP)</span>
							<span class="tit-2">Clients should not be forced to depend on interfaces they do not use.
								Meaning: Avoid large, bloated interfaces—split them into smaller, specific ones.
								<br/>
								✅ Example (Following ISP):
							</span>
							<pre class="code-style">
interface Workable {
	void work();
}

interface Eatable {
	void eat();
}

class HumanWorker implements Workable, Eatable {
	public void work() { System.out.println("Working..."); }
	public void eat() { System.out.println("Eating..."); }
}

class RobotWorker implements Workable {
	public void work() { System.out.println("Robot working..."); }
}

// Usage:
Workable worker = new HumanWorker();
worker.work();

❌ Bad Example: If we have one large interface:
interface Worker {
	void work();
	void eat();  // Not applicable to robots
}
🔹 Why? A RobotWorker should not be forced to implement eat(), as it does not need food.
✔ Fix: Split into separate interfaces so that classes only implement what they need.
							</pre>
							<span class="tit-1">5. Dependency Inversion Principle (DIP)</span>
							<span class="tit-2">High-level modules should not depend on low-level modules. Both should depend on abstractions.
								Meaning: Use interfaces/abstractions instead of concrete implementations.
								<br/>
								✅ Example (Following DIP)
							</span>
							<pre class="code-style">
// High-level module
class PaymentService {
	private PaymentProcessor processor;

	public PaymentService(PaymentProcessor processor) {
		this.processor = processor;
	}

	public void processPayment(int amount) {
		processor.pay(amount);
	}
}

// Abstraction (Interface)
interface PaymentProcessor {
	void pay(int amount);
}

// Low-level modules
class CreditCardPayment implements PaymentProcessor {
	public void pay(int amount) { System.out.println("Paid $" + amount + " via Credit Card"); }
}

class PayPalPayment implements PaymentProcessor {
	public void pay(int amount) { System.out.println("Paid $" + amount + " via PayPal"); }
}

// Usage:
PaymentProcessor payment = new CreditCardPayment();
PaymentService service = new PaymentService(payment);
service.processPayment(100);
<br/>
❌ Bad Example:
class PaymentService {
	private CreditCardPayment processor = new CreditCardPayment();
	public void processPayment(int amount) { processor.pay(amount); }
}
🔹 Why? Now, PaymentService directly depends on CreditCardPayment. If we need to switch to PayPalPayment, we must modify PaymentService—which violates DIP.
✔ Fix: Use an interface (PaymentProcessor) so that the high-level class is independent of specific payment methods.
							</pre>
						</p>
					</div>
				</li>
			</ul>
		</div>

		<div v-else-if="activeTab === 'PHP'">
			<h3>🐘 PHP Notes</h3>
			<ul>
				<li>Superglobals: $_GET, $_POST, $_SESSION</li>
				<li>PDO for secure database connections</li>
				<li>Include vs require</li>
			</ul>
		</div>

		<div v-else-if="activeTab === 'LeetCode'">
			<h3>LeetCode Solutions</h3>
				<h4 @click="toggleCollapse('solid')" class="collapsible-header">
						<span>{{ isCollapsed?.solid ? '➕' : '➖' }}</span>
						Group Anagrams 🚀
					</h4>
					<div v-show="!isCollapsed.solid" class="collapsible-content">
						<p class="sub-content">
							Given an array of strings strs, group the anagrams together. You can return the answer in any order.
							<br/>
							<span class="tit-2">Example 1:</span>
							<span class="tit-2">
								Input: strs = ["eat","tea","tan","ate","nat","bat"]
								<br/>
								Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
							</span>
							<span class="tit-2">
								Explanation:

							There is no string in strs that can be rearranged to form "bat".
							The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
							The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
							</span>
							<span class="tit-2">Example 2:</span>
							<span class="tit-2">
							Input: strs = [""]

							Output: [[""]]
							</span>

							<span class="tit-2">Example 3:</span>
							<span class="tit-2">
							Input: strs = ["a"]

							Output: [["a"]]
							</span>

							<span class="tit-2">Solution:</span>
							<span class="tit-2">Simply, if we can sort each character of each string, we can group them.</span>
							<pre class="code-style">
								"eat"   →   "aet"
								"tea"   →   "aet"
								"tan"   →   "ant"
								"ate"   →   "aet"
								"nat"   →   "ant"
								"bat"   →   "abt"

								"aet": ["eat", "tea", "ate"] 
								"ant": ["tan", "nat"]
								"bat": ["abt"]
							</pre>
							<span class="tit-2">We can create 3 groups with "aet", "ant" and "abt".</span>
							<pre class="code-style">
class Solution {
    public List&lt;List&lt;String&gt;&gt; groupAnagrams(String[] strs) {
		Map&lt;String, List&lt;String&gt;&gt; ans = new HashMap&lt;&gt;();
        

    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        if (!ans.containsKey(key)) {
            ans.put(key, new ArrayList&lt;&gt;());
        }
        ans.get(key).add(s);
    }

    return new ArrayList&lt;&gt;(ans.values());
    }
}
							</pre>
						</p>
						</div>
			</div>
	</div>
</div>
</template>

<script>
	export default {
		name: "TechNotes",
		data() {
			return {
				tabs: ["Java", "Magento", "LeetCode"],
				activeTab: "Java",
				isCollapsed: {
					solid: true
				}
			};
		},
		methods: {
			toggleCollapse(section) {
				this.isCollapsed[section] = !this.isCollapsed[section];
			}
		}
	};
</script>

<style scoped>
	.notes-all {
		max-width: 90%;
		display: block;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
	}
	.tabs {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}
	.tabs button {
		padding: 10px 15px;
		border: none;
		background-color: #eee;
		cursor: pointer;
		border-radius: 5px;
		transition: background 0.3s;
	}
	.tabs button.active {
		background-color: #007BFF;
		color: white;
		font-weight: bold;
	}
	.tab-content ul {
		padding-left: 20px;
	}
	.tab-content li {
		margin-bottom: 8px;
		display: block;
		text-align: left;
	}
	.tit-1 {
		display: block;
		color: darkred;
		font-weight: bold;
		text-align: left;
	}
	.tit-2 {
		display: block;
		text-align: left;
		margin-top: 10px;
	}
	.code-style {
		text-align: left;
	}
</style>
