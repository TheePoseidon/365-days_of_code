import xml.etree.ElementTree as ET

# Define transaction categories
CATEGORIES = {
    "Incoming Money": ["received from", "credit"],
    "Payments to Code Holders": ["paid to", "payment to"],
    "Transfers to Mobile Numbers": ["sent to", "transfer to"],
    "Bank Deposits": ["deposit", "bank transfer"],
    "Airtime Bill Payments": ["airtime", "top-up"],
    "Cash Power Bill Payments": ["cash power"],
    "Transactions Initiated by Third Parties": ["initiated by"],
    "Withdrawals from Agents": ["withdrawn at", "cash out"],
    "Bank Transfers": ["bank transfer"],
    "Internet and Voice Bundle Purchases": ["data bundle", "internet", "voice bundle"],
}

def categorize_message(message_text):
    """Categorizes an SMS transaction based on keywords."""
    message_text = message_text.lower()
    for category, keywords in CATEGORIES.items():
        if any(keyword in message_text for keyword in keywords):
            return category
    return "Uncategorized"

def parse_xml(file_path):
    """Parses an XML file and extracts SMS messages."""
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    transactions = []
    
    for sms in root.findall("sms"):
        sender = sms.get("sender", "Unknown")
        message_text = sms.get("body", "").strip()
        timestamp = sms.get("date", "Unknown")
        
        if message_text:
            category = categorize_message(message_text)
            transactions.append({
                "sender": sender,
                "message": message_text,
                "timestamp": timestamp,
                "category": category
            })
    
    return transactions

if __name__ == "__main__":
    file_path = "sms_data.xml"  # Change this to your actual XML file path
    transactions = parse_xml(file_path)

    # Print first 5 parsed transactions for preview
    for t in transactions[:5]:
        print(t)
