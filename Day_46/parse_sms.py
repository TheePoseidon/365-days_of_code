import xml.etree.ElementTree as ET
import re

CATEGORIES = {
    "Incoming Money": ["received from"],
    "Payments to Code Holders": ["payment to"],
    "Transfers to Mobile Numbers": ["transferred to"],
    "Bank Deposits": ["bank deposit"],
    "Airtime Bill Payments": ["airtime"],
    "Cash Power Bill Payments": ["cash power"],
    "Transactions Initiated by Third Parties": ["initiated by"],
    "Withdrawals from Agents": ["withdrawn"],
    "Bank Transfers": ["bank transfer"],
    "Internet and Voice Bundle Purchases": ["bundle purchase", "internet", "voice"],
}

def categorize_message(message_text):
    """Categorizes an SMS transaction based on keywords."""
    message_text = message_text.lower()
    for category, keywords in CATEGORIES.items():
        if any(keyword in message_text for keyword in keywords):
            return category
    return "Uncategorized"

def extract_amount(message):
    """Extracts the amount from the message using regex."""
    match = re.search(r"(\d{1,3}(?:,\d{3})*|\d+)\s*RWF", message)
    return match.group(1) if match else "Unknown"

def parse_xml(file_path):
    """Parses an XML file and extracts SMS messages."""
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    transactions = []
    
    for sms in root.findall("sms"):
        message_text = sms.get("body", "").strip()
        sender = sms.get("address", "Unknown")
        timestamp = sms.get("readable_date", "Unknown")
        
        if message_text:
            category = categorize_message(message_text)
            amount = extract_amount(message_text)
            transactions.append({
                "sender": sender,
                "message": message_text,
                "timestamp": timestamp,
                "amount": amount,
                "category": category
            })
    
    return transactions

if __name__ == "__main__":
    file_path = "modified_sms_v2.xml"  # Update with your actual file path
    transactions = parse_xml(file_path)

    for t in transactions[:5]:
        print(t)
