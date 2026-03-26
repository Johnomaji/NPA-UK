import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '../pages/Contact';
import { supabase } from '../lib/supabase';

// Provide minimum context the Contact page needs
vi.mock('../components/SiteContentProvider', () => ({
  useSiteContentContext: () => ({
    content: {
      language: 'en',
      location: 'Nenwe / United Kingdom',
      contactEmail: 'info@npa-uk.org',
      contactPhone: '+44 000 000 0000',
    },
  }),
}));

describe('Contact form', () => {
  beforeEach(() => {
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: null }),
    } as never);
  });

  it('renders all form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us how we can help')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Chidi Okafor');
    await user.type(screen.getByPlaceholderText('you@email.com'), 'chidi@example.com');
    await user.type(screen.getByPlaceholderText('Tell us how we can help'), 'Hello from Nenwe.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message when Supabase returns an error', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: new Error('DB error') }),
    } as never);

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Ada Eze');
    await user.type(screen.getByPlaceholderText('you@email.com'), 'ada@example.com');
    await user.type(screen.getByPlaceholderText('Tell us how we can help'), 'Test message.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while sending', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockReturnValue(new Promise(() => {})), // never resolves
    } as never);

    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Test');
    await user.type(screen.getByPlaceholderText('you@email.com'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Tell us how we can help'), 'Hello');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });
});
